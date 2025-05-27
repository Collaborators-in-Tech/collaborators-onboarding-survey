import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import ShortTextQuestion from "../questions/ShortTextQuestion";
import SelectQuestion from "../questions/SelectQuestion";
import CheckboxGroupQuestion from "../questions/CheckboxGroupQuestion";
import "../../styles/form/form.css";

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
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/form/questions")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setLoading(false);
        console.log("Questions fetched!", data);
      })

      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handleNext should also check if required fields are filled.
  const handleNext = () => {
    if (step < apiData.questions.length - 1) {
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
    navigate("/thank");
  };

  if (loading) return <div> Loading questions...</div>;
  if (!apiData || apiData.questions.length == 0 || !apiData.questions[step])
    return <div> Loading...</div>;
  console.log("Length: ",apiData.questions.length -1, "Step: ", step);

  return (
    <div className="form-container">
      <h2 className="form-title">{apiData.questions[step].questions_text}</h2>
      <form onSubmit={handleSubmit}>
        {(() => {
          const q = apiData.questions[step];
          const name = `question_${q.id}`; // use question ID as field name
          const value = formData[name] || "";
          const commonProps = {
            label: q.question_text,
            name,
            value,
            onChange: handleChange,
            required: q.is_required,
            placeholder: q.placeholder || "", // optional if not provided
          };

          if (q.type === "text" || q.type === "short-text") {
            return <ShortTextQuestion key={q.id} {...commonProps} />;
          }

          if (q.type === "select" && Array.isArray(q.options)) {
            return (
              <SelectQuestion key={q.id} {...commonProps} options={q.options} />
            );
          }

          if (q.type === "checkbox" && Array.isArray(q.options)) {
            return (
              <CheckboxGroupQuestion
                key={q.id}
                {...commonProps}
                values={formData[name] || []}
                options={q.options}
                showOtherInput={!!q.showOtherInput}
                otherValue={formData[`${name}_other`] || ""}
                onOtherChange={(e) =>
                  handleChange({
                    target: {
                      name: `${name}_other`,
                      value: e.target.value,
                    },
                  })
                }
                otherInputName={q.otherInputName}
                otherInputPlaceholder={q.otherInputPlaceholder}
              />
            );
          }

          return null;
        })()}
        <div className="form-nav">
          <button type="button" onClick={handleBack}>
            Back
          </button>
          {step < apiData.questions.length - 2 ? (
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
