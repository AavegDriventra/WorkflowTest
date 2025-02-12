import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../App";

const ContactCreated = ({ id }) => {
  const [selectedOption, setSelectedOption] = useState("");

  // Get context values
  const { targetComponentFields, setTargetComponentFields } = useContext(userContext);

  // Update context when "created" is selected or removed
  useEffect(() => {
    setTargetComponentFields((prevFields) => {
      const updatedFields = { ...prevFields };

      if (selectedOption === "created") {
        updatedFields["contact_created"] = {
          field_name: "created_contact",
          id,
          raw_data: { new_value: "created" },
        };
      // } else {
      //   // Remove the field from context when unselected
      //   delete updatedFields["contact_created"];
       }

      return updatedFields;
    });
  }, [selectedOption, setTargetComponentFields]);



  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value

    );
  };

  console.log("Context Updated:", 
 targetComponentFields
  );

  return (
    <div>
      <h3>Contact Created</h3>

      {/* Dropdown to select "Created" */}
      <label>
        Select Status:
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="created">Created</option>
        </select>
      </label>
    </div>
  );
};

export default ContactCreated;
