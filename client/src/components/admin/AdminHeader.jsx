import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";

const AdminHeader = ({ children ,handleNavigate}) => {
    const storedUser = localStorage.getItem("user");
    const admin = storedUser ? JSON.parse(storedUser) : null;
    const { logout } = useContext(AuthContext);
    
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    console.log("token: ",token);

    try {
        const response = await fetch(API.LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log("response is",response);

        if (response.ok) {
            logout(); 
            console.log("lets check local storage now");
            console.log(localStorage.getItem('user'));
            navigate("/admin");
        } else {
            console.error("Logout failed:", data);
        }

    } catch (error) {
        console.error("Error during logout:", error);
    }

};
 const handleClick = () => {
    handleNavigate();
 }

  return (
    <main className="admin-header">
      {handleNavigate ? (
        <p onClick={handleNavigate} className="admin-header-title clickable">
          {children}
        </p>
      ) : (
        <p className="admin-header-title">{children}</p>
      )}

      <div className="admin-name-wrapper">
        <p onClick={() => setShowDropdown(!showDropdown)} className="admin-name">
          {admin?.name} 
        </p>

        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminHeader;
