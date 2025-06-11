import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import {API} from "../../config/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";

const QuestionCard = ({ question, form, index }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleEdit = () => {
      navigate(`/admin/edit-question/${form.id}/${question.id}`);
    };
    const handleDelete = async (questionId) => {
      if (!window.confirm("Are you sure you want to delete this question?")) return;
    
      try {
        const response = await fetch(
          API.DELETE_QUESTION(form.id, questionId),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete the question.");
        }
        window.location.reload(); 
    
      } catch (err) {
        console.error(err);
        setError("Error deleting question: " + err.message);
      }
    };
    
  
    const optionsArray = (() => {
      if (!question.options) return []; 
  
      if (Array.isArray(question.options)) {
        return question.options; 
      }
  
      if (typeof question.options === 'string') {
        try {
          return JSON.parse(question.options);
        } catch {
          return question.options.split(',').map(opt => opt.trim());
        }
      }
  
      return [];
    })();
  
    return (
      <>
      <div className="question-card">
        <div className="question-card-header">
          <h4 className="question-text">
            {index}. {question.question_text}
          </h4>
          <FaPencilAlt
            onClick={handleEdit}
            className="edit-icon"
            title="Edit Question"
            size={18}
          />
          <FaTrash 
          onClick={() => handleDelete(question.id)}
          className="delete-icon"
          title="delete Question"
          size={18}
          />
        </div>
  
        {optionsArray.length > 0 && (
          <div>
            {optionsArray.map((opt, idx) => (
              <p key={idx}>{opt}</p>
            ))}
          </div>
        )}
      </div>
      {error && <ErrorModal message={error} onClose={() => setError("")} />}
     
      </>
      
    );
  };
  
  export default QuestionCard;
  