import React from "react";
import GoToFormButton from "../components/GoToFormButton";
import "../styles/welcome.css";

const WelcomePage = () => {
  return (
    <main>
      <h1>Welcome to Collaborators! 👋</h1>
      <p>Please fill out the form to join the community.</p>
      <GoToFormButton />
    </main>
  );
};

export default WelcomePage;
