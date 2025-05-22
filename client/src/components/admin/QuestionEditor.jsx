import React, { useState, useEffect } from "react";
import { FaPlus, FaRecycle, FaTrash } from "react-icons/fa";
import {API} from '../../config/api';
import { useNavigate } from "react-router-dom";
import "../../styles/admin/edit-question.css";

const QuestionEditor = ({ question, formId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question_text: "",
    type: "text",
    is_required: 0,
    options: [],
    sort_order: 1,
    depends_on_question_id: null,
    depending_value: "",
  });

  useEffect(() => {
    let parsedOptions = [];
  
    if (!question.options) {
      parsedOptions = [];
    } else if (Array.isArray(question.options)) {
      parsedOptions = question.options;
    } else if (typeof question.options === "string") {
      try {
        parsedOptions = JSON.parse(question.options);
      } catch {
        // If invalid JSON, fallback to splitting by comma or empty array
        parsedOptions = question.options.split(",").map(opt => opt.trim());
      }
    }
  
    setFormData({
      question_text: question.question_text || "",
      type: question.type || "text",
      is_required: question.is_required || 0,
      options: parsedOptions,
      sort_order: question.sort_order || 1,
      depends_on_question_id: question.depends_on_question_id || null,
      depending_value: question.depending_value || null,
    });
  }, [question]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      is_required: e.target.checked ? 1 : 0,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSave = async() => {
   
    const payload = {
        ...formData,
        options: formData.options ? JSON.stringify(formData.options) : null,
      };
    console.log("Save payload:", payload);
    console.log("question is here",question);
    try {
        const response = await fetch(API.UPDATE_QUESTION(formId,question.id), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          console.error("Update failed:", data);
          return;
        }
    
        console.log("Question updated successfully:", data);
        navigate("/admin/edit-form");
      } catch (error) {
        console.error("Error saving question:", error);
      }
  };
  const handleCancel = () => {
    navigate("/admin/edit-form");
    console.log("here is the cancel...");
  }

  return (
    <>
      <div className="question-editor">
        <label>Question Text</label>
        <textarea
          name="question_text"
          value={formData.question_text}
          onChange={handleChange}
          className="question-textarea"
          rows={4}
        />

        {/* <label>Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="question-select"
        >
          <option value="text">Text</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
          <option value="dropdown">Dropdown</option>
        </select> */}

        {(formData.type === "radio" ||
          formData.type === "checkbox" ||
          formData.type === "dropdown") && (
          <div className="question-options">
            <label>Options:</label>
            {formData.options.map((opt, idx) => (
              <div key={idx} className="option-item">
                <input
                  className="option-edit-input"
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
                <span onClick={() => removeOption(idx)}> <FaTrash></FaTrash></span>
                
          
              </div>
            ))}
            <span onClick={addOption}><FaPlus></FaPlus>Add Option</span>
          </div>
        )}

        <label className="check-box" >
          <input
            type="checkbox"
            name="is_required"
            checked={formData.is_required === 1}
            onChange={handleCheckboxChange}
          />
         Required
        </label>

        <label>Sort Order</label>
        <input
          className="option-edit-input"
          type="number"
          name="sort_order"
          value={formData.sort_order}
          onChange={handleChange}
        />

        {/* <label>Depends On Question ID</label>
        <input
        className="option-edit-input"
          type="number"
          name="depends_on_question_id"
          value={formData.depends_on_question_id || ""}
          onChange={handleChange}
        />

        <label>Depending Value</label>
        <input
        className="option-edit-input"
          type="text"
          name="depending_value"
          value={formData.depending_value || ""}
          onChange={handleChange}
        /> */}

      </div>

      <div className="form-nav">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </>
  );
};

export default QuestionEditor;
