import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TicketStatusChanged = () => {
  const [ticketFields, setTicketFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]); // State to store selected fields
  const [fieldValues, setFieldValues] = useState({}); // State to store old and new values for each field

  // Fetch the fields when the component mounts
  useEffect(() => {
    const fetchTicketFields = async () => {
      const response = await axios.get('http://localhost:8000/tickets/fields');
      console.log('Ticket Fields:', response.data);
      setTicketFields(response.data);  // Set the fields in state
    };

    fetchTicketFields();
  }, []); // Empty dependency array means this will run only once, when the component mounts

  // Handle multi-select change
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedFields(selectedOptions);  // Update the selected fields array

    // Initialize the fieldValues state with empty new and old values for selected fields
    const newFieldValues = { ...fieldValues };
    selectedOptions.forEach((field) => {
      if (!newFieldValues[field]) {
        newFieldValues[field] = { oldValue: '', newValue: '' };
      }
    });
    setFieldValues(newFieldValues);  // Set the field values state
  };

  // Handle input field changes (for old and new values)
  const handleFieldValueChange = (field, type, value) => {
    const newFieldValues = { ...fieldValues };
    newFieldValues[field][type] = value;
    setFieldValues(newFieldValues);  // Update the field values state
  };

  return (
    <div>
      <select multiple value={selectedFields} onChange={handleSelectChange}>
        <option value="">Select Ticket Fields</option>
        {ticketFields.map((field, index) => (
          <option key={index} value={field}>
            {field}
          </option>
        ))}
      </select>

      {/* Dynamically render input fields for each selected field */}
      <div>
        <h3>Selected Fields:</h3>
        {selectedFields.map((field, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{field}</h4>

            {/* Input for Old Value */}
            <div>
              <label>Old Value:</label>
              <input
                type="text"
                value={fieldValues[field]?.oldValue || ''}
                onChange={(e) => handleFieldValueChange(field, 'oldValue', e.target.value)}
              />
            </div>

            {/* Input for New Value */}
            <div>
              <label>New Value:</label>
              <input
                type="text"
                value={fieldValues[field]?.newValue || ''}
                onChange={(e) => handleFieldValueChange(field, 'newValue', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStatusChanged;
