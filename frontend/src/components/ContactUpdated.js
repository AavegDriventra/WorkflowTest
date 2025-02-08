import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';

const ContactUpdated = ({ id }) => {
  const [contactFields, setContactFields] = useState([]); // Hold the contact fields data
  const [selectedFields, setSelectedFields] = useState([]); // Track selected fields
  const [fieldValues, setFieldValues] = useState({}); // Store values of selected fields

  // Get the context value
  const { targetComponentFields, setTargetComponentFields } = useContext(userContext);
  console.log("Context Value in ContactUpdated:", targetComponentFields);

  // Fetch contact fields from API
  useEffect(() => {
    const fetchContactFields = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contacts/fields');
        console.log('Contact Fields:', response.data);
        setContactFields(response.data);
      } catch (error) {
        console.error("Error fetching contact fields:", error);
      }
    };
    fetchContactFields();
  }, []);

  // Handle field selection
  const handleFieldSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    console.log("Selected fields:", selectedOptions);
    setSelectedFields(selectedOptions);

    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues };
      selectedOptions.forEach((field) => {
        if (!updatedValues[field]) {
          updatedValues[field] = {
            id: id,
            raw_data: { old_value: "", new_value: "" },
          };
        }
      });
      

      return updatedValues;
    });
  };

  // Handle input changes for old/new values
  const handleInputChange = (field, type, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: {
        ...prevValues[field],
        raw_data: {
          ...prevValues[field]?.raw_data,
          [type]: value,
        },
      },
    }));
  };

  // Update the context whenever fieldValues change
  useEffect(() => {
    setTargetComponentFields((prevContext) => ({
      ...prevContext,
      ...fieldValues, // Merge new field values into the context
    }));
  }, [fieldValues, setTargetComponentFields]);

  return (
    <div>
      {/* Multi-select dropdown for fields */}
      <select multiple value={selectedFields} onChange={handleFieldSelectChange}>
        <option value="">Select Contact Fields</option>
        {contactFields.map((field, index) => (
          <option key={index} value={field}>
            {field}
          </option>
        ))}
      </select>

      {/* Inputs for selected fields */}
      <div>
        {selectedFields.map((field, index) => (
          <div key={index}>
            <h4>{field}</h4>
            <label>
              Old Value:
              <input
                type="text"
                value={fieldValues[field]?.raw_data?.old_value || ''}
                onChange={(e) => handleInputChange(field, 'old_value', e.target.value)}
                placeholder="Enter New Value"
              />
            </label>
            <label>
              New Value:
              <input
                type="text"
                value={fieldValues[field]?.raw_data?.new_value || ''}
                onChange={(e) => handleInputChange(field, 'new_value', e.target.value)}
                placeholder="Enter Old value"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUpdated;
