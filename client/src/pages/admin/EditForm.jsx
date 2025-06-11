import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../config/api";
import QuestionCard from "../../components/admin/QuestionCard";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";

import "../../styles/admin/admin.css";
import GoBack from "../../components/admin/GoBack";

const EditForm = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [form,setForm] = useState([]);
    const {id} = useParams(); //formId

   

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(API.GET_QUESTIONS(id), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch questions");

                const data = await res.json();
                console.log("FORM  !!!!: ", data.form);
                setForm(data.form);
                console.log("Fetched questions ++++++:", data.questions);
                // Sort by sort_order (ascending)
                const sorted = data.questions.sort((a, b) => a.sort_order - b.sort_order);
                setQuestions(sorted);
            } catch (err) {
                console.error("Error fetching form questions", err);
            }
        };

        fetchQuestions();
    }, []);

    const addQuestion = () =>{
        const nextSortOrder = questions.length ? Math.max(...questions.map(q => q.sort_order)) +1 : 1;
        navigate(`/admin/add-question/${id}`,{
            state:{nextSortOrder},
        });
    }
        
    return (
        <>
                <GoBack  url ={"/admin/admin-dashboard"}/>
                <div className="edit-form">
                <h3>{form?.name}</h3>
               
                {questions.map((question,index) => (
                    <div  key={index} className="question-card-container">
                    <QuestionCard  
                    key={question.id}
                    index={index + 1}
                    form = {form}
                    question={question}
                    />
                   </div>
                ))}
                <button onClick= {addQuestion} className="add-question-btn">
                    <FaPlusCircle style={{ marginRight: "5px" }} />
                    Add Question
                </button>
              
                </div>
        </>
    );
};

export default EditForm;
