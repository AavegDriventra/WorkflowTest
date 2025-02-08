import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import TicketStatusChanged from './TicketStatusChanged';
import ContactCreated from './ContactCreated';
import ContactUpdated from './ContactUpdated';

// import the dynamic components are 
import { userContext } from '../App';



// Component mapping to dynamically render based on selected targets
const componentMapping = {
  TicketStatusChanged: TicketStatusChanged,
  ContactCreated: ContactCreated,
  ContactUpdated: ContactUpdated,
}; // make dynamically 

const Main = () => {
  const [entityData, setEntityData] = useState([]); // Array hold entity
  const [entityId, setEntityId] = useState(''); // Hold the selected entity ID 
  const [targetData, setTargetData] = useState([]); // Array to hold targets Data 
  const [selectedTargets, setSelectedTargets] = useState([]); // Array to hold selected targets
  // const [targetComponentFields , setTargetComponentFields] = useContext(userContext);

  // console.log("All data" , targetComponentFields);
  const contextValue = useContext(userContext);
  console.log("Context Value in Main:", contextValue);
  const { targetComponentFields } = useContext(userContext);
   useEffect(()=>{
    console.log("Context Value targets in Main:", targetComponentFields);
   },[targetComponentFields]) // It render the targetComponentFields whenever the value is changed 


  

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
  }, [entityId]); // When the entity ID changes, fetch the target data

  // Handle entity selection change
  const handleEntitySelectChange = (event) => {
    console.log("Selected Entity ID:", event.target.value);
    setEntityId(event.target.value); // Store the selected entity ID
    setSelectedTargets([]); // Reset target selection when entity changes
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
          const SelectedComponent = componentMapping[component_name] || null;
          return SelectedComponent ? (
            <SelectedComponent key={component_name} id={id} />
          ) : null;
        })}
      </div>

      {/* <div>
        <h3>Context Data from ContactUpdated:</h3>
        <pre>{JSON.stringify(targetComponentFields, null, 2)}</pre>
      </div> */}

    </div>
    </>
  );
};

export default Main;
