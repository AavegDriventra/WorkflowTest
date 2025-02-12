import axios from 'axios';
import React, { useContext, useEffect, lazy, useState } from 'react';
import { userContext } from '../App';
import ComponentMapping from '../componentMapping/ComponentMapping';

const ActionComponentMapping = {
  SendNotification: lazy(() => import('../actions/SendNotification')),
  ManageCompanyList: lazy(() => import('../actions/ManageCompanyList')),
  ManageContactList: lazy(() => import('../actions/ManageContactList')),
  ManageDealList: lazy(() => import('../actions/ManageDealList')),
}

const Main = () => {
  const [entityData, setEntityData] = useState([]); // Array hold entity
  const [entityId, setEntityId] = useState(); // Hold the selected entity ID 
  const [targetData, setTargetData] = useState([]); // Array to hold targets Data 
  const [selectedTargets, setSelectedTargets] = useState([]); // Array to hold selected targets

  const [workflowName, setWorkflowName] = useState('');
  const [workflowId, setWorkflowId] = useState();
  const [actionData, setActionData] = useState([]);
  const [selectedActions , setSelectedActions] = useState([])


  const { targetComponentFields } = useContext(userContext);
  const {actionComponents} = useContext(userContext);
  useEffect(() => {
    console.log("Context Value targets in Main:", targetComponentFields);
    console.log("Context Value targets in Main: ", actionComponents);
  }, [targetComponentFields , actionComponents]) // It render the targetComponentFields whenever the value is changed 

  // Fetch entity data
  useEffect(() => {
    const fetchEntityData = async () => {
      const response = await axios.get('http://localhost:8000/entitylist/all');
      console.log('Entity List:', response.data);
      setEntityData(response.data);
    };

    fetchEntityData();

  }, []);


  // Fetch target data based on the selected entity
  useEffect(() => {
    if (!entityId) return;

    const handleTargetEntity = async () => {
      const response = await axios.post('http://localhost:8000/target/getTargetEntity', {
        workflow_target_entity_id: entityId,
      });
      console.log('Target Data:', response.data);
      setTargetData(response.data);
    };

    handleTargetEntity();
    // -----------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------
    const handleActionEntity = async () => {
      const response = await axios.post('http://localhost:8000/actions/getbyid', {
        entity_id: entityId,
      })
      console.log('Action Data:', response.data);
      setActionData(response.data);
    }
    handleActionEntity();
  }, [entityId]); // When the entity ID changes, fetch the target data

  // Handle entity selection change
  const handleEntitySelectChange = (event) => {
    console.log("Selected Entity ID:", event.target.value);
    setEntityId(event.target.value); // Store the selected entity ID
    setSelectedTargets([]); // Reset target selection when entity changes
    setSelectedActions([]); // Reset Action selection when entity changes
  };

  // Handle target multi-selection change
  const handleTargetSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    console.log("Selected Targets:", selectedOptions);

    // Store both ID and component_name
    const selectedComponents = targetData
      .filter(target => selectedOptions.includes(target.component_name))
      .map(target => ({
        id: target.id, // Target ID
        component_name: target.component_name, // Target Component Name
      }));
    setSelectedTargets(selectedComponents); // Update array of selected targets
  };

  const handleActionSelectChange = (event) => {
    if (!entityId) return;
    const selectedActionOptions = Array.from(event.target.selectedOptions, option => option.value);
    console.log("Selected Actions:", selectedActionOptions);
  
    const selectedActionComponents = actionData
      .filter(action => selectedActionOptions.includes(action.action_components))
      .map(action => ({
        id: action.id,
        action_components: action.action_components,
      }));
    setSelectedActions(selectedActionComponents); // Update array of selected actions
  };

  const handleWorkflowNameChange = (event) => {
    setWorkflowName(event.target.value);
  }


  const handleSubmit = async () => {
    const workflowResponse = await axios.post('http://localhost:8000/workflow/add', {
      workflow_name: workflowName,
    });

    const newWorkflowId = workflowResponse.data.id;
    setWorkflowId(newWorkflowId);
    let order = 1;

    for (const [key, value] of Object.entries(targetComponentFields)) {
      const { field_name, id, raw_data } = value;
      await axios.post('http://localhost:8000/events/add', {
        entity_event_meta: field_name,
        meta_data: raw_data,
        workflow_target_entity_events_id: id,
        workflow_id: newWorkflowId,
        event_order: order,
      });
      order++;
      console.log(`Sent event data for: ${field_name}`);
    }

    let actionOrder = 1;
    for(const [key , val] of Object.entries(actionComponents)){
      const { field_name , id } = val;
      await axios.post('http://localhost:8000/actionentitymeta/add', {
        entity_actions_meta: field_name,
        action_id:id,
        workflow_id:newWorkflowId,
        action_order:actionOrder
      })
      actionOrder++;
      console.log(`Sent action data for: ${field_name}`);
    }

    console.log("All data sent successfully.");

  }

  return (
    <>
      <div>
        {/* Entity Selection Dropdown */}
        <div style={{ margin: '30px' }}>
          <select value={entityId} onChange={handleEntitySelectChange}>
            <option value="">Select an Entity</option>
            {entityData.map((entityItem) => (
              <option key={entityItem.id} value={entityItem.id}>
                {entityItem.workflow_target_entities}
              </option>
            ))}
          </select>
        </div>

        {/* Target Selection Dropdown with multi-select */}
        <div style={{ margin: '30px' }}>
          <select multiple onChange={handleTargetSelectChange} value={selectedTargets.map(target => target.component_name)}>
            <option value="">Select a Target</option>
            {targetData.map((targetItem) => (
              <option key={targetItem.id} value={targetItem.component_name}>
                {targetItem.workflow_target_entity_events}
              </option>
            ))}
          </select>
        </div>

        {/* Render selected components dynamically */}
        <div style={{ margin: '30px' }}>
          {selectedTargets.map(({ id, component_name }) => {
            const SelectedComponent = ComponentMapping[component_name] || null;
            return SelectedComponent ? (
              <SelectedComponent key={component_name} id={id} />
            ) : null;
          })}
        </div>


        {/* //--------------------------------------------------------------------------------------- */}
        {/* //--------------------------------------------------------------------------------------------------- */}

        <div style={{ margin: '30px' }}>
          <select multiple onChange={handleActionSelectChange} value={selectedActions.map(action => action.action_components)}>
            <option value="">Select a Action</option>
            {actionData.map((actionItem) => (
              <option key={actionItem.id} value={actionItem.action_components}>
                {actionItem.action_name}
              </option>
            ))}
          </select>
        </div>

        {/* Render selected components dynamically */}
        <div style={{ margin: '30px' }}>
          {selectedActions.map(({ id, action_components }) => {
            const SelectedActionComponent = ActionComponentMapping[action_components] || null;
            return SelectedActionComponent ? (
              <SelectedActionComponent key={action_components} id={id} />
            ) : null;
          })}
        </div>

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
    </>
  );
};

export default Main;
