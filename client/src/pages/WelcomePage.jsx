import React from "react";
import GoToFormButton from "../components/GoToFormButton";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  return (
    <main className="welcome-container">
      <div className="welcome-content">
        <p className="welcome-text">
          Join our community
          <br />
          of professionals in IT, design and communication.
          <br />
          <br />
          Help us in our world domination!
        </p>
        <GoToFormButton />
      </div>
    </main>
  );
};

export default WelcomePage;
