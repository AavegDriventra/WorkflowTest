import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../App';



const ManageCompanyList = ({id}) => {
  const [actionEventData, setActionEventData] = useState([]); // Hold the contact fields data
  const [selectedFields, setSelectedFields] = useState([]); // Track selected fields
  const [fieldValues, setFieldValues] = useState({}); // Store values of selected fields

  // Get the context value
  const { actionComponents, setActionComponents } = useContext(userContext);
  console.log("Context Value in Send Notification:", actionComponents);

  // Fetch contact fields from API
  useEffect(() => {
    const fetchActionEventData = async () => {
      if (!id) return; // Prevent API call if id is undefined or null
      const response = await axios.post('http://localhost:8000/actionevent/byids', {
        action_component_id: id, // Sending id in request body
      });
      console.log('Action Event Data:', response.data);
      setActionEventData(response.data); // Store response data in state
    };
    fetchActionEventData();
  }, [id]);



  // Handle field selection
  const handleFieldSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    // console.log("Selected fields:", selectedOptions);
    setSelectedFields(selectedOptions);
    const updatedValues = {};
    selectedOptions.forEach((field) => {
      if (!updatedValues[field]) {
        updatedValues[field] = {
          field_name: field,
          id: id,
        };
      }
    });
    setFieldValues(updatedValues);
  };

  // Update the context whenever fieldValues change
  useEffect(() => {
    setActionComponents((prevContex) => {
      // console.log("PrevContext for prev : ", prevContex);
      const otherComponentFields = {};
      if (prevContex) {
        Object.entries(prevContex).forEach(([field_name, field_data]) => {
          // console.log("fieldName : ", field_name, "\n field_Values : ", field_data)
          if (field_data.id !== id) {
            otherComponentFields[field_name] = field_data;
            // console.log(otherComponentFields)
          } // field_id is equal to current component id if it is true key value pair will be added to otherComponentFields
        })
      }
      // console.log("field values : ", fieldValues)
      return { ...otherComponentFields, ...fieldValues }
    })
  }, [fieldValues]);

  return (
    <div>
      {/* Multi-select dropdown for fields */}
      <select multiple value={selectedFields} onChange={handleFieldSelectChange}>
        <option value="">Select notification</option>
        {actionEventData.map((field, index) => (
          <option key={index} value={field.action_field}>
            {field.action_field}
          </option>
        ))}
      </select>
      {/* Inputs for selected fields */}
    </div>
  );
}

export default ManageCompanyList