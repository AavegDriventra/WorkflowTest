import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [entityData, setEntityData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');

  const [targetData, setTargetData] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [componentsMap, setComponentsMap] = useState({});
  const [newValues, setNewValues] = useState({});

  const [workflowName, setWorkflowName] = useState('');
  const [workflowId, setWorkflowId] = useState(null);

  const [actionData, setActionData] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);

  const [selectedComponents, setSelectedComponents] = useState({});

  useEffect(() => {
    const fetchEntityData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/entitylist/all');
        setEntityData(response.data);
      } catch (error) {
        console.error('Error fetching entity data:', error);
      }
    };

    fetchEntityData();
  }, []);

  useEffect(() => {
    const fetchActionData = async () => {
      try {
        const actionResponse = await axios.get("http://localhost:8000/actions/all");
        setActionData(actionResponse.data);
      } catch (error) {
        console.error("Error fetching action data:", error);
      }
    };
    fetchActionData();
  }, []);

  const handleEntityChange = (e) => {
    setSelectedEntity(e.target.value);
    setSelectedTargets([]);
    setComponentsMap({});
  };

  useEffect(() => {
    const fetchTargetData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/target/all');
        setTargetData(response.data);
      } catch (error) {
        console.error('Error fetching target data:', error);
      }
    };

    fetchTargetData();
  }, []);

  useEffect(() => {
    if (selectedEntity) {
      const filtered = targetData.filter(
        (target) => target.workflow_target_entity_id.toString() === selectedEntity
      );
      setSelectedTargets([]);
      setComponentsMap({});
    }
  }, [selectedEntity, targetData]);

  const handleTargetChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTargets(selectedOptions);

    const newComponentsMap = {};
    const newSelectedComponents = {};

    selectedOptions.forEach((targetId) => {
      const target = targetData.find((t) => t.id.toString() === targetId);
      if (target && target.component_name) {
        try {
          const components = JSON.parse(target.component_name);
          newComponentsMap[targetId] = components;
          newSelectedComponents[targetId] = []; // Initialize empty selection
        } catch (error) {
          newComponentsMap[targetId] = [];
          newSelectedComponents[targetId] = [];
        }
      }
    });

    setComponentsMap(newComponentsMap);
    setSelectedComponents(newSelectedComponents);
  };


  const handleComponentSelection = (targetId, e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedComponents((prev) => ({
      ...prev,
      [targetId]: selected,
    }));
  };

  const handleNewValueChange = (targetId, component, value) => {
    setNewValues((prev) => ({
      ...prev,
      [targetId]: {
        ...prev[targetId],
        [component]: value,
      },
    }));
  };


  const handleWorkflowNameChange = (e) => {
    setWorkflowName(e.target.value);
  };

  const handleActionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedActions(selectedOptions);
  };


  const handleSubmit = async () => {
    if (!workflowName || selectedTargets.length === 0) {
      alert('Please select all fields and enter new values.');
      return;
    }
  
    try {
      // Create workflow
      const workflowResponse = await axios.post('http://localhost:8000/workflow/add', {
        workflow_name: workflowName,
      });
  
      const newWorkflowId = workflowResponse.data.id;
      setWorkflowId(newWorkflowId);
  
      // Add events based on the order of selected targets and components
      for (let targetIndex = 0; targetIndex < selectedTargets.length; targetIndex++) {
        const targetId = selectedTargets[targetIndex];
        const target = targetData.find((t) => t.id.toString() === targetId);
        const targetName = target ? target.workflow_target_entity_events : '';
  
        let eventOrder = 1; // Start event order from 1 for each target
        for (const component of selectedComponents[targetId] || []) {
          const newValue = newValues[targetId]?.[component] || '';
  
          await axios.post('http://localhost:8000/events/add', {
            entity_event_meta: component,
            meta_data: { newValue },
            workflow_target_entity_events_id: targetId,
            workflow_id: newWorkflowId,
            event_order: eventOrder,
          });
  
          eventOrder++; // Increment order for next event
        }
      }
  
      // Add actions based on the order of selection
      for (let actionIndex = 0; actionIndex < selectedActions.length; actionIndex++) {
        const actionId = selectedActions[actionIndex];
  
        await axios.post("http://localhost:8000/actionentitymeta/add", {
          entity_actions_meta: actionData.find((a) => a.id.toString() === actionId)?.action_name,
          action: actionId,
          workflow: newWorkflowId,
          action_order: actionIndex + 1, // Assign order based on selection index
        });
      }
  
      alert('Workflow created successfully!');
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred while creating the workflow.');
    }
  };
  

  return (
    <div style={{ marginLeft: '20px' }}>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="entityDropdown">Select Entity:</label>
        <select id="entityDropdown" value={selectedEntity} onChange={handleEntityChange}>
          <option value="">--Select an Entity--</option>
          {entityData.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.workflow_target_entities}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="targetDropdown">Select Target(s):</label>
        <select
          id="targetDropdown"
          multiple
          value={selectedTargets}
          onChange={handleTargetChange}
          style={{ height: '100px' }}
        >
          {targetData
            .filter((target) => target.workflow_target_entity_id.toString() === selectedEntity)
            .map((target) => (
              <option key={target.id} value={target.id}>
                {target.workflow_target_entity_events}
              </option>
            ))}
        </select>
      </div>

      {selectedTargets.map((targetId) => (
        <div key={targetId} style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h4>Target: {targetData.find((t) => t.id.toString() === targetId)?.workflow_target_entity_events}</h4>

          <label style={{ marginTop: '20px' }}>Select Components:</label>
          <select multiple onChange={(e) => handleComponentSelection(targetId, e)}>
            {componentsMap[targetId]?.map((component) => (
              <option key={component} value={component}>
                {component}
              </option>
            ))}
          </select>

          {/* Render input fields only for selected components */}
          {selectedComponents[targetId]?.map((component) => (
            <div style={{ marginTop: '20px' }} key={`${targetId}-${component}`}>
              <label style={{ marginTop: '20px' }}>{component}:</label>
              <input
                type="text"
                value={newValues[targetId]?.[component] || ""}
                onChange={(e) => handleNewValueChange(targetId, component, e.target.value)}
                placeholder={`Enter value for ${component}`}
              />
            </div>
          ))}
        </div>
      ))}



      

      <label style={{ marginTop: '20px' }}>Select Actions:</label>
      <select style={{ marginTop: '20px' }} multiple value={selectedActions} onChange={handleActionChange}>
        {actionData.map((actionItem) => (
          <option key={actionItem.id} value={actionItem.id}>
            {actionItem.action_name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        <label style={{ marginTop: '20px' }} htmlFor="workflowName">Enter Workflow Name:</label>
        <input
          id="workflowName"
          type="text"
          value={workflowName}
          onChange={handleWorkflowNameChange}
          placeholder="Enter workflow name"
        />
      </div>

      <button style={{ marginTop: '20px' }} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Main;

