import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import QuestionCard from "../components/admin/QuestionCard";
import { FaArrowLeft } from "react-icons/fa";

const EditFormQuestions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [form,setForm] = useState([]);

    const handleNavigate = () => {
        navigate("/admin/admin-dashboard");
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(API.GET_QUESTIONS, {
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

    return (
        <>
            <div className="admin-container">
                <h3>{form?.name}</h3>

                {questions.map((question,index) => (
                    <QuestionCard 
                    key={question.id}
                    index={index + 1}
                    form = {form}
                    question={question}
                    />
                ))}
            </div>
        </>
    );
};

export default EditFormQuestions;
