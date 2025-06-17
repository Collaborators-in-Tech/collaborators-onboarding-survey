import { useContext, useState } from "react";
import GoBack from "../../components/admin/GoBack";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/admin/profile.css"
import {API} from "../../config/api";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";

const Profile = () => {
  const { user,token } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")

  const handleNameChange = (e) => {
    e.preventDefault();
    // TODO: Add API call to update name
    
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

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      // TODO: Add API call to delete account
      console.log("Account deleted");
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
            onClick={handleDeleteAccount}
            className=""
          >
            Delete My Account
          </button>
        </div>
       { error && <ErrorModal message={error} onClose={() => setError("")}/>}
       {success && <SuccessModal message={success} onClose={() => setSuccess("")}/>}
      </main>
    </>
  );
};

export default Profile;
