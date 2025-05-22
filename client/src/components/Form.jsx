import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import ShortTextQuestion from "./questions/ShortTextQuestion";
import SelectQuestion from "./questions/SelectQuestion";
import CheckboxGroupQuestion from "./questions/CheckboxGroupQuestion";
import "../styles/form.css";

const steps = [
  {
    title: "Who are you?",
    questions: [
      {
        type: "short-text",
        label: "Enter full name",
        name: "fullName",
        required: true,
        placeholder: "Pippi Långstrump",
      },
      {
        type: "short-text",
        label: "Enter email",
        name: "email",
        required: true,
        placeholder: "starkast.i.varlden@gmail.com",
      },
    ],
  },
  {
    title: "What's your professional roll now or what are you aiming for?",
    questions: [
      {
        type: "short-text",
        label: "Profession",
        name: "profession",
        required: true,
        placeholder: "Potato designer",
      },
    ],
  },
  {
    title: "What's your top priority for career growth right now?",
    questions: [
      {
        type: "short-text",
        label: "Top priority",
        name: "topPriority",
        required: true,
        placeholder: "More interview experience",
      },
    ],
  },
  {
    title: "What are you hoping to get from this community?",
    questions: [
      {
        type: "select",
        label: "What do you need?",
        name: "communityNeed",
        required: true,
        placeholder: "Chose an option",
        options: [
          { value: "networking", label: "Networking" },
          { value: "projects", label: "Projects" },
          { value: "mentorship", label: "Mentorship" },
          { value: "inspiration", label: "Inspiration" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    title: "What times suit you best for joining projects?",
    questions: [
      {
        type: "checkbox-group",
        label: "",
        name: "projectTimes",
        required: true,
        options: [
          { value: "full_day", label: "Full day" },
          { value: "morning", label: "Morning" },
          { value: "afternoon", label: "Afternoon" },
          { value: "evening", label: "Evening" },
          { value: "weekend", label: "Weekend" },
        ],
      },
    ],
  },
  {
    title: "How many hours can you contribute to projects each week?",
    questions: [
      {
        type: "short-text",
        label: "Amount of hours",
        name: "hoursPerWeek",
        required: true,
        placeholder: "e.g. 3h or 4 to 6h",
      },
    ],
  },
  {
    title:
      'Which disciplines do you want to work with? If you choose "other", please specify.',
    questions: [
      {
        type: "checkbox-group",
        label: "",
        name: "disciplines",
        required: true,
        options: [
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend" },
          { value: "full_stack", label: "Full stack" },
          { value: "ux_design", label: "UX design" },
          { value: "ui_design", label: "UI design" },
          { value: "graphic_design", label: "Graphic design" },
          { value: "communication", label: "Communication" },
        ],
        showOtherInput: true,
        otherInputName: "disciplinesOther",
        otherInputPlaceholder: "Specify",
      },
    ],
  },
  {
    title: "Describe yourself with emojis.",
    questions: [
      {
        type: "short-text",
        label: "Add a couple of emojis :)",
        name: "emojis",
        required: true,
        placeholder: ":D",
      },
    ],
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
    email: "",
    profession: "",
    topPriority: "",
    communityNeed: "",
    projectTimes: [],
    hoursPerWeek: "",
    disciplines: [],
    disciplinesOther: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{steps[step].title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        {steps[step].questions.map((q) => {
          if (q.type === "short-text") {
            return (
              <ShortTextQuestion
                key={q.name}
                label={q.label}
                name={q.name}
                value={formData[q.name]}
                onChange={handleChange}
                required={q.required}
                placeholder={q.placeholder}
              />
            );
          }
          if (q.type === "select") {
            return (
              <SelectQuestion
                key={q.name}
                label={q.label}
                name={q.name}
                value={formData[q.name]}
                onChange={handleChange}
                required={q.required}
                placeholder={q.placeholder}
                options={q.options}
              />
            );
          }
          if (q.type === "checkbox-group") {
            const isDisciplines = q.name === "disciplines";
            return (
              <CheckboxGroupQuestion
                key={q.name}
                label={q.label}
                name={q.name}
                values={formData[q.name]}
                onChange={handleChange}
                required={q.required}
                options={q.options}
                showOtherInput={!!q.showOtherInput}
                otherValue={isDisciplines ? formData.disciplinesOther : ""}
                onOtherChange={
                  isDisciplines
                    ? (e) =>
                        handleChange({
                          target: {
                            name: "disciplinesOther",
                            value: e.target.value,
                          },
                        })
                    : undefined
                }
                otherInputName={q.otherInputName}
                otherInputPlaceholder={q.otherInputPlaceholder}
              />
            );
          }
          return null;
        })}
        <div className="form-nav">
          <button type="button" onClick={handleBack}>
            Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className="next" onClick={handleNext}>
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
