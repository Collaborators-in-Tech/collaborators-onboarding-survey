import React from "react";
import GoToFormButton from "../components/GoToFormButton";
import globe from "../assets/globe.svg";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <main className="welcome-container">
      <div className="welcome-content">
        <p className="welcome-text">
          Join our community of professionals in IT, design and communication.
        </p>
        <p className="welcome-text">Help us in our world domination!</p>
        <img className="welcome-image" src={globe} alt="" aria-hidden />
        <GoToFormButton />
      </div>
    </main>
  );
};

export default WelcomePage;
