import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import {API}  from "../config/api"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [formsList, setFormsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.GET_ANSWERS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user answers.");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched answers:", data);
        setFormsList(data);
      })
      .catch((err) => {
        console.error("Error fetching form answers:", err);
      });
  }, []);

  const handleShowDetails = (userData) =>{
        navigate("/admin/user-details",{state:{user:userData}});
  }
const handleDelete = (id) =>{
    if(!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(API.DELETE_USER(id),{
        method: "DELETE",
        headers: {
            Authorization : `Bearer ${localStorage.getItem("authToken")}`,

        }, 
    }).then((res) => {
        if(!res.ok) throw new Error("Failed to delete user");
        setFormsList(formsList.filter((entry) => entry.id != id));
    }).catch((error) =>{
        console.error("Delete error: ",error);
    })


}
  return (
    <main>
      <h2>Welcome to Admin Dashboard!</h2>
      <Logout />
      <h3>All users who filled the form</h3>

      {formsList.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
            <th>action</th>
            </tr>
          </thead>
          <tbody>
            {formsList.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>
                     <button onClick={() => handleShowDetails(entry)}>Show All</button>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No form submissions found.</p>
      )}
    </main>
  );
};

export default AdminDashboard;
