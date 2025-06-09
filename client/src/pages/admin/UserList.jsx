import {API}  from "../../config/api"
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import "../../styles/admin/admin.css";
import GoBack from "../../components/admin/GoBack";
import { AuthContext } from "../../context/AuthContext";


const UserList = () =>{
    const [formsList, setFormsList] = useState([]);
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
   
    useEffect(() => {
        const getUsrs = async () =>{
          try{
            const response = await fetch(API.GET_ANSWERS,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
              },
            })
            if (!response.ok) {
               throw new Error("Failed to fetch user answers.");
            }
            console.log("all users :",response);
            const data = await response.json();
            console.log("response data:",data);
            setFormsList(data)

          }catch(err){
            console.error("Error fetching form answers:", err);
          }

        }
        getUsrs();
    }, []);
  
    const handleShowDetails = (userData) =>{
          navigate("/admin/user-details",{state:{user:userData}});
    }
  const handleDelete = (id) =>{
      if(!window.confirm("Are you sure you want to delete this user?")) return;
  
      fetch(API.DELETE_USER(id),{
          method: "DELETE",
          headers: {
              Authorization : `Bearer ${token}`,
  
          }, 
      }).then((res) => {
          if(!res.ok) throw new Error("Failed to delete user");
          setFormsList(formsList.filter((entry) => entry.id != id));
      }).catch((error) =>{
          console.error("Delete error: ",error);
      })
  
  
  }
    return (
      <>
      <GoBack url={"/admin/admin-dashboard"} />
      <h3>Users form submission  List</h3>
        <div className="user-list">
            
            {formsList.length > 0 ? (
                <div className="user-list">
                    <div className="user-list-header">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Form Title</span>
                    <span>Action</span>
                    </div>

                    {formsList.map((entry) => (
                    <div key={entry.id} className="user-list-row">
                        <span>{entry.name}</span>
                        <span>{entry.email}</span>
                        <span>{entry.form_title}</span>
                        <span className="action-buttons">
                            <span onClick={() => handleShowDetails(entry)}>< FaInfoCircle /></span>
                            <span onClick={() => handleDelete(entry.id)}><FaTrashAlt /></span>
                        </span>
                    </div>
                    ))}
                </div>
                ) : (
                <p>No form submissions found.</p>
                )}
     </div>
     </>

    );

}
export default UserList;