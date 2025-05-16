
import Logout from "../components/Logout";
import Register from "../components/admin/Register";
import AdminHeader from "../components/admin/adminHeader";
import "../styles/admin.css";
import UserList from "../components/admin/UserList";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const editForm = () => {
        navigate("/admin/edit-form");
    }

  return (
    <>
    <header> <AdminHeader>Admin Dashboard</AdminHeader></header>
    <main className="admin-container">
      <Logout />
      <Register /> 
      <Button onClick={editForm}> Edit form Questions</Button>
      <UserList /> 
    </main>
    </>
  );
};

export default AdminDashboard;
