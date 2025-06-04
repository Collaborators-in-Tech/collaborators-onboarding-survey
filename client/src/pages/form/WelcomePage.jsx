import React, { useEffect, useState } from "react";
import "../../styles/WelcomePage.css";
import GoToFormButton from "../../components/form/GoToFormButton";
import { Link, useNavigate } from "react-router-dom";
import {API} from "../../config/api";

const WelcomePage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForms = async () => {
      try {
        const response = await fetch(API.GET_FORMS);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("all forms:",response);
        const data = await response.json();
        console.log("response data:",data);
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    getForms();
  }, []);


  if (loading) return <p>Loading forms...</p>;
  if (!forms.length) return <p className="welcome-text">No forms available.</p>;

  return (
    <main className="welcome-container">
      <div className="welcome-content">
      <h1>Welcome to Collaboratores Platform</h1>
      
        <h3>Select a form to begin</h3>
        <div>
          {forms.map((form) => (
           <div key={form.id}>
              <Link to={`/form/${form.id}`}>{form.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
