import React, { useState } from "react";

const EditForm = ({ data, onSubmit }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = () => {
    // Perform any validation or data processing here
    onSubmit(editedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Data</h2>
      <form>
        <label>
          Genre:
          <input
            type="text"
            name="genres"
            value={editedData.genres}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={editedData.date}
            onChange={handleInputChange}
          />
        </label>
        {/* Add more input fields for other properties */}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
