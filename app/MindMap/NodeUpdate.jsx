import React, { useState } from 'react';

const NodeUpdateForm = ({ nodeId, onClose, onUpdate }) => {
  const [updatedLabel, setUpdatedLabel] = useState('');

  const handleLabelChange = (e) => {
    setUpdatedLabel(e.target.value);
  };

  const handleUpdate = () => {
    // Gọi hàm onUpdate để cập nhật dữ liệu nút
    console.log('Updating with data:', { label: updatedLabel });
    onUpdate({ label: updatedLabel });
  };

  return (
    <div className="node-update-form">
      <h2>Update Node</h2>
      <label>New Label:</label>
      <input type="text" value={updatedLabel} onChange={handleLabelChange} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default NodeUpdateForm;
