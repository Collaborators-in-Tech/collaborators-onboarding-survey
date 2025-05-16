import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/admin/adminHeader";

const EditFormQuestions = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/admin/admin-dashboard");

    }
    return (
        <>
            <header> <AdminHeader handleNavigate = {handleNavigate}>Back to Dashboard </AdminHeader></header>
            <div className="admin-container">
                <h1>
                    edit form here
                </h1>
            </div> 
        </>
    )
}
export default EditFormQuestions;