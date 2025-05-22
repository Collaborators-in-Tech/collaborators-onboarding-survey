import React from "react";

const CheckboxGroupQuestion = ({
  label,
  description,
  values = [],
  onChange,
  required = false,
  name,
  options = [],
  showOtherInput = false,
  otherValue = "",
  onOtherChange = () => {},
  otherInputName = "",
  otherInputPlaceholder = "",
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onChange({ target: { name, value: [...values, value] } });
    } else {
      onChange({ target: { name, value: values.filter((v) => v !== value) } });
    }
  };

  const showOther = showOtherInput && values.includes("other");

  return (
    <div className="question checkbox-group-question">
      <label className="question-label">{label}</label>
      {description && <div className="question-description">{description}</div>}
      <div className="checkbox-group">
        {options.map((opt) => (
          <label key={opt} className="checkbox-option">
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={values.includes(opt)}
              onChange={handleCheckboxChange}
            />
            <span>{opt}</span>
          </label>
        ))}
        {showOtherInput && (
          <div style={{ width: "100%" }}>
            <label
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                marginBottom: 8,
                display: "block",
              }}
            >
              Other
            </label>
            <input
              type="text"
              name={otherInputName}
              value={otherValue}
              onChange={onOtherChange}
              placeholder={otherInputPlaceholder}
              className="question-input"
              style={{ maxWidth: 400 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxGroupQuestion;
