import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import ShortTextQuestion from "../questions/ShortTextQuestion";
import SelectQuestion from "../questions/SelectQuestion";
import CheckboxGroupQuestion from "../questions/CheckboxGroupQuestion";
import "../../styles/form/form.css";
import {API} from "../../config/api";

const Form = () => {
  const [step, setStep] = useState(0);
  const {formId} = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API.GET_QUESTIONS(formId))
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

  const getEmailValue = () => {
    const emailQuestion = apiData.questions.find(
      (q) => q.type === "email" || q.question_text.toLowerCase().includes("email")
    );
  
    if (!emailQuestion) return "";
    return formData[`question_${emailQuestion.id}`] || "";
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    const email = getEmailValue();
    const consent_given = true; 
    const answers = {};
    for (const key in formData) {
      if (key.startsWith("question_")) {
        const questionId = key.split("_")[1];
        answers[questionId] = formData[key];
      }
    }
    console.log("_________ANSWERS___________");
    console.log(answers);

    try {
      const response = await fetch(API.POST_ANSWERS(formId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          consent_given,
          answers,
        }),
      });
  
      if (!response.ok) {
        const err = await response.json();
        alert("Error: " + (err.error || "Unknown error"));
        return;
      }
  
      const data = await response.json();
      console.log("Success:", data);
      navigate("/thank");
  
    } catch (err) {
      console.error("Submission failed:", err);
      alert("There was an error submitting the form.");
    }
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
            return <ShortTextQuestion key={q.id} {...commonProps} type="text" />;
          }
          if (q.type === "email") {
            return (
              <ShortTextQuestion key={q.id} {...commonProps} type="email" />
            );
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
