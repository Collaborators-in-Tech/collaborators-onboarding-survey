import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import {API} from "../config/api";

const Login = ({isOpen,toggleForm}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        toggleForm()
        console.log("login button")
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(API.LOGIN,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email,password})
            });
            const data = await response.json();
            console.log("login information",data);
            console.log("token",data.token);
            localStorage.setItem("authToken",data.token);
            console.log("user",data.user);
            localStorage.setItem("user",data.user);
            navigate("/admin/admin-dashboard");

        } catch(error){
            console.error("Error logging in: ",error);
        }

    }
    return(
        <>
            <Button variant="yellow" onClick={handleLogin} className="mx-2"> Login</Button>
            {isOpen && (
                <div>
                     <h3>Log In here</h3>
                <form onSubmit={handleSubmit} >
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
                        <input type="password" 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required />
                    </div>
                    <Button type="submit" >Submit</Button>

                </form>
                </div>
            )}
        </>
    )

}
export default Login;