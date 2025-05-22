
import "../styles/admin.css";
import UserList from "../components/admin/UserList";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const editForm = () => {
        navigate("/admin/edit-form");
    }
    const registerAdmin = () => {
      navigate("/admin/register")
    }

  return (
    <>
   
    <main className="admin-main">
      <Button onClick={registerAdmin}> Register new admin</Button>
      <Button onClick={editForm}> Edit form Questions</Button>
      <UserList /> 
    </main>
    </>
  );
};

export default AdminDashboard;
