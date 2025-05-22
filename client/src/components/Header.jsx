import React, { useContext } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; 

const Header = () => {
  const {user} = useContext(AuthContext);

  return(
    <header className="main-header">
      <div className="main-header-icons"> 
        <h1 className="main-header-title">COLLABORATORS</h1>
        {user && (
          <span className="menu-icon">
            <FaBars />
          </span>
        )}
      </div>

      <div className="main-header-bar">
        <div className="bar0"></div>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
      </div>
    </header>
  );
}


export default Header;
