import React from "react";

const ShortTextQuestion = ({
  label,
  description,
  value,
  onChange,
  required = false,
  placeholder = "Type your answer here...",
  name,
}) => (
  <div className="question short-text-question">
    <label className="question-label">
      {label}
      {required && <span style={{ color: "#f3c846", marginLeft: 4 }}>*</span>}
    </label>
    {description && <div className="question-description">{description}</div>}
    <input
      className="question-input"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      autoComplete="off"
    />
  </div>
);

export default ShortTextQuestion;
