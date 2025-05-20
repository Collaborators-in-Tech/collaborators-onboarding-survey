import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const QuestionCard = ({ question, form, index }) => {
    const navigate = useNavigate();
  
    const handleEdit = () => {
      navigate(`/admin/edit-question/${form.id}/${question.id}`);
    };
  
    // Safely parse options
    const optionsArray = (() => {
      if (!question.options) return []; // null or undefined → empty array
  
      if (Array.isArray(question.options)) {
        return question.options; // already an array, use directly
      }
  
      if (typeof question.options === 'string') {
        try {
          // Try to parse JSON string
          return JSON.parse(question.options);
        } catch {
          // If not valid JSON, fallback: split by comma & trim
          return question.options.split(',').map(opt => opt.trim());
        }
      }
  
      return [];
    })();
  
    return (
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
        </div>
  
        {optionsArray.length > 0 && (
          <div>
            {optionsArray.map((opt, idx) => (
              <p key={idx}>{opt}</p>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default QuestionCard;
  