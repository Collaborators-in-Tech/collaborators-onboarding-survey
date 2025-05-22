import Button from "./Button";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; 

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);  // Get logout function from context

  console.log("logout from context is--->>>>:", logout);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    console.log("token: ", token);

    try {
      const response = await fetch(API.LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response is", response);
      // const data = await response.json();

      if (response.ok) {
        logout();    // Clear auth context & localStorage
        console.log("lets check local storage now");
        console.log(localStorage.getItem('user'));
        navigate("/admin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button onClick={handleLogout} className="mx-2">Logout</Button>;
};

export default Logout;
