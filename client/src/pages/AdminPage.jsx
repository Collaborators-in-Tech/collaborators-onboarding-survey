import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState("login");
  const toggleForm = (form) => {
      setActiveForm((prev) => prev === form ? null : form);
     
  }
  return (
    <main >
      <h2>Admin Page!</h2>
      <Login  isOpen={activeForm === "login"} toggleForm={() => toggleForm("login")}/>
      <Register isOpen={activeForm === "register"} toggleForm={ () => toggleForm("register")} />   
    </main>
  );
};

export default AdminPage;
