import { useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import {API} from "../../config/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            console.log("user----->>>",data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("_____________user from storage______");
            console.log(localStorage.getItem("user"));
            navigate("/admin/admin-dashboard");

        } catch(error){
            console.error("Error logging in: ",error);
        }

    }
    return(
        <> 
            <div>     
                <form onSubmit={handleSubmit} >
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
                        placeholder="Password"
                        required />
                    </div>
                    <Button type="submit" >Login</Button>

                </form>
            </div>
            
        </>
    )

}
export default Login;