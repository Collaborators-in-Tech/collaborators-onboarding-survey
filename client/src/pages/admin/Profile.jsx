import { useContext, useState } from "react";
import GoBack from "../../components/admin/GoBack";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/admin/profile.css"
import {API} from "../../config/api";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user,token,updateUser,logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const confirm = "Are you sure you want to delete your account? This cannot be undone"; 


  const handleNameChange = (e) => {
    e.preventDefault();
    const changeName = async() => {
        try{
            const response = await fetch(API.UPDATE_NAME,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({name:name})
            })
            const data = await response.json();
            console.log("response data",data);
            if(response.ok){
                updateUser(data.user);  
                setName(data.user.name);   
                setSuccess("Name updated successfully!!");
                return;
            }
            
        }catch(err){
            setError("error in updating name: " || err );
        }
    }
    changeName();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return;
    }
    const changePassword = async() =>{
        const payload = {
            current_password: currentPassword,
            new_password: password
        }
        try{
            const response = await fetch(API.UPDATE_PASSWORD,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload)
            })
            console.log("response",response);
            if(response.ok){
                setPassword("");
                setConfirmPassword("");
                setCurrentPassword("");
                setSuccess("Password updated successfully!!");
                return;
            }

        }catch(err){
            setError("error in updating password: " || err );

        }
       
    }
    changePassword();

  };

  const handleDeleteAccount = async() => {
    setShowDeleteModal(false);
    try {
        const response = await fetch(API.DELETE_ACCOUNT, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Delete successful, clear auth and redirect
          //updateUser(null); // or use logout if available
          // If you don't have logout, call logout method in context or implement:
           logout(); 
  
          navigate("/admin"); // redirect to admin login or landing page
        } else {
          const data = await response.json();
          setError(data.message || "Failed to delete account");
        }
      } catch (err) {
        setError("Error deleting account: " + err.message);
      }
    
  };

  return (
    <>
      <GoBack url="/admin/admin-dashboard" />
      <main className="admin-container">
        <h2 className="" style={{ color: "black" }}>Profile Settings</h2>

        <form onSubmit={handleNameChange} className="update-setting">        
                <label className="">Change Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="option-edit-input"
                />
                <button type="submit" className="">
                    Update Name
                </button>
        </form>

        {/* Change Password */}
        <form onSubmit={handlePasswordChange} className="update-setting">
          <label className="">Change Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="option-edit-input"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="option-edit-input"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="option-edit-input"
          />
          <button type="submit" className="">
            Update Password
          </button>
        </form>

        <div className="delete-setting">
          <button
            onClick={() => setShowDeleteModal(true)}
            className=""
          >
            Delete My Account
          </button>
        </div>
       { error && <ErrorModal message={error} onClose={() => setError("")}/>}
       {success && <SuccessModal message={success} onClose={() => setSuccess("")}/>}
        <ConfirmModal 
            isOpen={showDeleteModal} 
            message={confirm}  
            onConfirm={() => {
                handleDeleteAccount();
                
            }}
        onCancel={() => setShowDeleteModal(false)}/>
      </main>
    </>
  );
};

export default Profile;
