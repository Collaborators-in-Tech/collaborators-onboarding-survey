import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoToFormButton.css";

const GoToFormButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <button className="welcome-btn" onClick={handleClick}>
      Lets rock!
    </button>
  );
};

export default GoToFormButton;
