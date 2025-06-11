import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../config/api";
import ErrorModal from "../../components/modals/ErrorModal";
import GoBack from "../../components/admin/GoBack";
import "../../styles/admin/edit-question.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const QUESTION_TYPES = ["text", "email", "radio", "checkbox", "boolean"];

export default function AddQuestion() {
  const { state } = useLocation();          // state.nextSortOrder passed from EditForm
  const navigate = useNavigate();
  const { formId } = useParams();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    question_text: "",
    description: "",
    type: "text",
    is_required: false,
    options: [""],       // start with one blank option for radio/checkbox
    sort_order: state?.nextSortOrder ?? 1,
    depends_on_question: false,
    depending_value: null,
  });

  const [error, setError] = useState("");

  // ---------------- handlers ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOptionChange = (idx, value) => {
    setFormData((p) => {
      const copy = [...p.options];
      copy[idx] = value;
      return { ...p, options: copy };
    });
  };

  const addOption = () =>
    setFormData((p) => ({ ...p, options: [...p.options, ""] }));

  const removeOption = (idx) =>
    setFormData((p) => ({
      ...p,
      options: p.options.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strip empty option strings
    const payload = {
      ...formData,
      options:
        formData.type === "radio" || formData.type === "checkbox"
          ? formData.options.filter((o) => o.trim() !== "")
          : undefined,
    };
    console.log("______new question_______");
    console.log(payload);

    // try {
    //   const res = await fetch(API.CREATE_QUESTION(formId), {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!res.ok) {
    //     const err = await res.json();
    //     throw new Error(err.error ?? "Unknown error");
    //   }

    //   navigate(`/admin/edit-form/${formId}`);        // back to the form
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  // ---------------- UI ----------------
  return (
    <>
      <GoBack url={`/admin/edit-form/${formId}`} />

      <div className="edit-question-container">

      <form className="question-editor" onSubmit={handleSubmit}>
        {/* Question text */}
        <label>Question Text *</label>
        <textarea
          name="question_text"
          value={formData.question_text}
          onChange={handleChange}
          className="question-textarea"
          rows={4}
          required
        />

        {/* Description */}
        <label>Description </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="question-textarea"
                rows={4}
                placeholder="optional"
              />
        <label className="check-box" >
          <input
            type="checkbox"
            name="is_required"
            checked={formData.is_required}
            onChange={handleChange}
          />
          Required
        </label>

        {/* Type selector */}
        <label className="">
          Type
          <select className= "type-select" name="type" value={formData.type} onChange={handleChange}>
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Required */}
       

        {/* Options list (only for radio / checkbox) */}
        {(formData.type === "radio" || formData.type === "checkbox") && (
          <div className="question-options">
            <p>Options:</p>
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

        {/* Depends on question */}
        {/* <label className="check-box" >
          <input
            type="checkbox"
            name="depends_on_question"
            checked={formData.depends_on_question}
            onChange={handleChange}
          />
          Depends on another question
        </label>

        {formData.depends_on_question && (
          <label >
            Show when answer equals
            <input
              type="text"
              name="depending_value"
              value={formData.depending_value}
              onChange={handleChange}
              placeholder="option value"
            />
          </label>
        )} */}

        {/* Hidden sort_order (readonly) */}
        <input type="hidden" value={formData.sort_order} name="sort_order" />

        <button type="submit">Save Question</button>
      </form>

      <ErrorModal message={error} onClose={() => setError("")} />
      </div>
    </>
  );
}
