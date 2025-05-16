import {API}  from "../../config/api"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";


const UserList = () =>{
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
        <div className="user-list">
            <p>User List</p>
            {formsList.length > 0 ? (
                <div className="user-list">
                    <div className="user-list-header">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Action</span>
                    </div>

                    {formsList.map((entry) => (
                    <div key={entry.id} className="user-list-row">
                        <span>{entry.name}</span>
                        <span>{entry.email}</span>
                        <span className="action-buttons">
                            <span onClick={() => handleShowDetails(entry)}><FaEye /></span>
                            <span onClick={() => handleDelete(entry.id)}><FaTrashAlt /></span>
                        </span>
                    </div>
                    ))}
                </div>
                ) : (
                <p>No form submissions found.</p>
                )}
     </div>

    );

}
export default UserList;