import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import "../styles/form.css";

const questions = [
  {
    label: "Full name:",
    type: "text",
    name: "fullName",
    required: true,
  },
  {
    label: "Main goal in joining Collaborators:",
    type: "select",
    name: "goal",
    options: [
      { value: "networking", label: "Networking" },
      { value: "projects", label: "Networking & Building Projects" },
    ],
  },
  {
    label: "Weekly available hours:",
    type: "number",
    name: "hours",
    min: 1,
    max: 42,
  },
  {
    label: "Best times to join:",
    type: "text",
    name: "times",
  },
  {
    label: "Describe yourself with emojis:",
    type: "text",
    name: "emojis",
  },
];

const colorBlocks = [
  "#b7d8d6",
  "#e6b0aa",
  "#f7ca18",
  "#e67e22",
  "#27ae60",
  "#7ed6df",
  "#f6e58d",
  "#95a5a6",
  "#6c5ce7",
  "#fd7272",
  "#34495e",
  "#f8c291",
];

const Form = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    goal: "",
    hours: "",
    times: "",
    emojis: "",
  });

  const currentQuestion = questions[step];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="form-container">
      <div className="color-bar">
        {colorBlocks.map((color, idx) => (
          <div
            key={idx}
            className="color-block"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          {currentQuestion.label}
          {currentQuestion.type === "select" ? (
            <select
              name={currentQuestion.name}
              value={formData[currentQuestion.name]}
              onChange={handleChange}
            >
              {currentQuestion.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              value={formData[currentQuestion.name]}
              onChange={handleChange}
              min={currentQuestion.min}
              max={currentQuestion.max}
              required={currentQuestion.required}
            />
          )}
        </label>
        <div className="form-nav">
          {step > 0 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          {step < questions.length - 1 ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <SubmitButton />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
