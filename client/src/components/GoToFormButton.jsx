import React from "react";
import { useNavigate } from "react-router-dom";

const GoToFormButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };

  return <button onClick={handleClick}>Start the Form</button>;
};

export default GoToFormButton;
