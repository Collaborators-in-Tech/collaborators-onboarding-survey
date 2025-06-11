import React from "react";
import "./modal.css";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message || "Are you sure?"}</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Yes</button>
          <button onClick={onCancel} className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
