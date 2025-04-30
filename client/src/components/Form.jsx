import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import "../styles/form.css";

const questions = [
  {
    label: "Enter your full name (and email, if you want)",
    type: "text",
    name: "fullName",
    required: true,
    description: "This helps us identify you in Collaborators.",
  },
  {
    label:
      "What professional role do you have right now, or which role are you aiming for?",
    type: "text",
    name: "role",
    required: true,
  },
  {
    label: "What is your biggest need right now in your career development?",
    type: "text",
    name: "needs",
    required: false,
  },
  {
    label: "What do you hope to get out of being part of Collaborators?",
    type: "select",
    name: "goal",
    required: true,
    options: [
      { value: "networking", label: "Networking and inspiration" },
      { value: "projects", label: "Building projects and developing skills" },
      { value: "both", label: "Both networking and building projects" },
    ],
    description: "Choose the option that fits you best.",
  },
  {
    label: "What times work best for you to join projects right now?",
    type: "multiSelect",
    name: "times",
    required: true,
    options: [
      { value: "fullday", label: "Full day" },
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
      { value: "weekends", label: "Weekends" },
    ],
  },
  {
    label: "How many hours can you contribute to projects each week?",
    type: "number",
    name: "hours",
    min: 1,
    max: 42,
    required: true,
  },
  {
    label: "Which technologies do you want to work with?",
    type: "multiSelect",
    name: "technologies",
    required: false,
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "fullstack", label: "Fullstack" },
      { value: "design", label: "UI/UX Design" },
      { value: "devops", label: "DevOps" },
      { value: "other", label: "Other" },
    ],
    description:
      "Select all that apply. If you choose 'Other', please specify.",
  },
  {
    label: "Describe yourself with emojis",
    type: "text",
    name: "emojis",
    required: false,
    description: "Add a few emojis that describe you 😊",
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
    role: "",
    needs: "",
    goal: "",
    times: [],
    hours: "",
    technologies: [],
    otherTechnology: "",
    emojis: "",
  });

  const currentQuestion = questions[step];

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const newValue = e.target.checked
        ? [...(formData[name] || []), value]
        : (formData[name] || []).filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOtherTechChange = (e) => {
    setFormData((prev) => ({ ...prev, otherTechnology: e.target.value }));
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
          {currentQuestion.description && (
            <span className="description">{currentQuestion.description}</span>
          )}
          {currentQuestion.type === "select" ? (
            <select
              name={currentQuestion.name}
              value={formData[currentQuestion.name]}
              onChange={handleChange}
            >
              <option value="">Choose an option</option>
              {currentQuestion.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : currentQuestion.type === "multiSelect" ? (
            <div className="checkbox-group">
              {currentQuestion.options.map((opt) => (
                <label key={opt.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={currentQuestion.name}
                    value={opt.value}
                    checked={formData[currentQuestion.name]?.includes(
                      opt.value
                    )}
                    onChange={handleChange}
                  />
                  {opt.label}
                  {currentQuestion.name === "technologies" &&
                    opt.value === "other" &&
                    formData.technologies.includes("other") && (
                      <input
                        type="text"
                        className="other-input"
                        placeholder="Please specify..."
                        value={formData.otherTechnology}
                        onChange={handleOtherTechChange}
                        style={{ marginLeft: 8 }}
                      />
                    )}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              value={formData[currentQuestion.name]}
              onChange={handleChange}
              min={currentQuestion.min}
              max={currentQuestion.max}
              required={currentQuestion.required}
              autoComplete={
                ["fullName", "role"].includes(currentQuestion.name)
                  ? "off"
                  : "on"
              }
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
