import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import AdminHeader from "../components/admin/adminHeader";
import QuestionEditor from "../components/admin/QuestionEditor";
import { FaArrowLeft } from "react-icons/fa";

const EditQuestion = () => {
    const { formId, questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/admin/edit-form");
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(API.GET_QUESTION(formId, questionId), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch question");
                }

                const data = await response.json();
                setQuestion(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [formId, questionId]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <header>
                <AdminHeader handleNavigate={handleNavigate}><FaArrowLeft/></AdminHeader>
            </header>
            <main className="admin-container">
                <div className="edit-card">
                    <QuestionEditor question = {question} formId={formId}/>                            
                </div>
            </main>
        </>
    );
};

export default EditQuestion;
