import { useState } from "react";
import Button from "../components/Button";
import {API}from "../config/api";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/admin/adminHeader";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        setIsOpen(!isOpen);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const respnse = await fetch(API.REGISTER,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email,name,password})
            });
            const data = await respnse.json();
            console.log("data---->",data);
            navigate("/admin/admin-dashboard");

        }catch(error){
            console.error("Error registering the user: ",error);
        }


    }
    const handleNavigate = () => {
        navigate("/admin/admin-dashboard");
    }
    return(
        <>
            <header> <AdminHeader handleNavigate = {handleNavigate}>Back to Dashboard </AdminHeader></header>
            <div className="admin-container">
                <h3>Register new admin</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                        className="question-input"
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required />
                    </div>
                    <div>
                        <input 
                        className="question-input"
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required />
                    </div>
                    <div>
                        <input 
                            className="question-input"
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required />
                    </div>
                    <Button  type="submit" >Submit</Button>
                </form>
            </div>
        
        </>
    )

}
export default Register;