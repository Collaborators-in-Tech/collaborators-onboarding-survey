import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";


const QuestionCard = ({ question,form,index }) => {
    const navigate = useNavigate();
    console.log("questions options",question);
    console.log("form,",form);

    const handleEdit = () => {
        navigate(`/admin/edit-question/${form.id}/${question.id}`);
    };

    return (
        <div className="question-card">
            <div className="question-card-header">
                <h4 className="question-text">{index}. {question.question_text}</h4>
                <FaPencilAlt
                    onClick={handleEdit}
                    className="edit-icon"
                    title="Edit Question"
                    size={18}
                />
            </div>
            { question.options && (
                <div>
                       {JSON.parse(question.options).map((opt, idx) => (
                            <p key={idx}>{opt}</p>
                        ))}
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
