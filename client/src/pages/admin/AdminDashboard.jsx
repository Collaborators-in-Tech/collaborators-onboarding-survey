
import "../../styles/admin/admin.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { FaBook, FaEllipsisV, FaList, FaPlug, FaPlus, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import {API} from "../../config/api";

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const getForms = async () => {
      try {
        const response = await fetch(API.GET_FORMS);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("all forms:",response);
        const data = await response.json();
        console.log("response data:",data);
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } 
    };

    getForms();
  }, []);



    const toggleDropdown = (formId) => {
      setDropdownOpen(dropdownOpen === formId ? null : formId);
    };
    const editForm = (id) => {
      navigate(`/admin/edit-form/${id}`);
    }
    const registerAdmin = () => {
      navigate("/admin/register")
    }
    const userSubmissions = () => {
      navigate("/admin/users-list")
    }
    const addForm = () => {
      navigate("/admin/add-form")
    }
    const adminList = () => {
      navigate("/admin/admins-list")
    }
    const deleteForm = async (formId) => {
      setDropdownOpen(null);
      if (window.confirm("Are you sure you want to delete this form?")) {
       
        // try {
        //   const response = await fetch(`${API.DELETE_FORM}/${formId}`, {
        //     method: "DELETE",
        //   });
        //   if (!response.ok) throw new Error("Failed to delete form");
    
        //   setForms(forms.filter((form) => form.id !== formId));
        // } catch (error) {
        //   console.error("Error deleting form:", error);
        // }
      }
    };
    

  return (
    <>
   
    <main className="admin-main">
      <div className="box-container"  >
         <h3>create new form</h3>
         <div className="box">
          <div className="icon-box" onClick={addForm} > <FaPlus className="plus-icon"/></div>
         </div>
      </div>
      <div className="divider-line"></div>
      <div className="box-container">
         <h3>Manage forms</h3>
         <div className="box">
         {forms.map((form) => (
            <div key={form.id}>
              <div className="ellipsis-box"> 
                
                <div className="icon-box" onClick={() => editForm(form.id)}>
                  <FaBook className="book-icon" />
                </div>
                <span onClick={() => toggleDropdown(form.id)}><FaEllipsisV /></span>
                {dropdownOpen === form.id && (
                  <div className="dropdown-menu">
                    <div onClick={() => deleteForm(form.id)}>Delete</div>
                  </div>
                )}
              </div>
              {form.name}
            </div>
          ))}    
          </div>
      </div>
      <div className="divider-line"></div>
      <div className="box-container">
         <h3>Manage admin</h3>
         <div className="box">
           <div ><div className="icon-box" onClick={registerAdmin}>  <FaPlus className="plus-icon"/> </div>New admin</div> 
            <div><div className="icon-box" onClick={adminList}>  <FaList /></div>admin list </div>    
         </div> 
      </div>
      <div className="divider-line"></div>
        <div className="box-container">
          <h3>User Submissions</h3>
          <div className="box">
            <div>
              <div className="icon-box" onClick={userSubmissions}>
                <FaUsers className="user-icon" />
              </div>
              Submitted Users
            </div>
          </div>
        </div>
    
    </main>
    </>
  );
};

export default AdminDashboard;
