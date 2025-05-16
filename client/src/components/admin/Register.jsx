import { useState } from "react";
import Button from "../Button";
import {API}from "../../config/api";
import { useNavigate } from "react-router-dom";

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
    return(
        <>
            <Button variant="purple" onClick={handleRegister}> Register new admin</Button>

            {isOpen && (
                <div>
                     <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                     <div>
                        <label>Name:</label>
                        <input
                         type="text" 
                         name="name" 
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <Button  type="submit" >Submit</Button>

                </form>
                </div>
            )}
        </>
    )

}
export default Register;