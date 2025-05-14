import React from "react";

const SelectQuestion = ({
  label,
  description,
  value,
  onChange,
  required = false,
  placeholder = "Choose an option",
  name,
  options = [],
}) => (
  <div className="question select-question">
    <label className="question-label">
      {label}
      {required && <span style={{ color: "#f3c846", marginLeft: 4 }}>*</span>}
    </label>
    {description && <div className="question-description">{description}</div>}
    <select
      className="question-input"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectQuestion;
