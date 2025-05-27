import React, { useContext, useState, useRef, useEffect } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

const Header = () => {
  const { user, logout,token } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
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

  return (
    <header className="main-header">
      <div className="main-header-icons"> 
        <h1 className="main-header-title">COLLABORATORS</h1>
        
        {user && (
          <div className="menu-wrapper" ref={dropdownRef}>
            <span className="menu-icon" onClick={() => setShowDropdown(prev => !prev)}>
              <FaBars />
            </span>

            {showDropdown && (
              <div className="menu-dropdown">
                <p className="dropdown-username">{user?.name}</p>
                <button onClick={handleLogout} className="dropdown-logout">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="main-header-bar">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`bar${i}`}></div>
        ))}
      </div>
    </header>
  );
};

export default Header;
