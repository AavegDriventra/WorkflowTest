import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';

const ContactUpdated = ({ id }) => {
  const [contactFields, setContactFields] = useState([]); // Hold the contact fields data
  const [selectedFields, setSelectedFields] = useState([]); // Track selected fields
  const [fieldValues, setFieldValues] = useState({}); // Store values of selected fields

  // Get the context value
  const { targetComponentFields, setTargetComponentFields } = useContext(userContext);
  // console.log("Context Value in ContactUpdated:", targetComponentFields);

  // Fetch contact fields from API
  useEffect(() => {
    const fetchContactFields = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contacts/fields'); //  pass in the object instead of array object with the id 
        // console.log('Contact Fields:', response.data);
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
    // console.log("Selected fields:", selectedOptions);
    setSelectedFields(selectedOptions);

    const updatedValues = {};
    selectedOptions.forEach((field) => {
      if (!updatedValues[field]) {
        updatedValues[field] = {
          field_name: field,
          id: id,
          raw_data: { old_value: "", new_value: "" },
        };
      }

    });
    // console.log("Updated Values : ",
    //   updatedValues
    // );

    setFieldValues(updatedValues);
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
    setTargetComponentFields((prevContex) => {
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
          <div key={index}>...
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
