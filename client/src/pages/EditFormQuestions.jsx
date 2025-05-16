import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/admin/adminHeader";
import { useEffect, useState } from "react";
import { API } from "../config/api";

const EditFormQuestions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

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
            <header>
                <AdminHeader handleNavigate={handleNavigate}>Back to Dashboard</AdminHeader>
            </header>
            <div className="admin-container">
                <h3>Edit Form Questions</h3>
                {questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.question_text}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EditFormQuestions;
