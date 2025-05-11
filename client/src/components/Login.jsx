import { useState } from "react";
import Button from "./Button";

const Login = ({isOpen,toggleForm}) => {

    const handleLogin = () => {
        toggleForm()
        console.log("login button")
    }
    const handleSubmit = () => {

    }
    return(
        <>
            <Button variant="yellow" onClick={handleLogin} className="mx-2"> Login</Button>
            {isOpen && (
                <div>
                     <h3>Log In here</h3>
                <form >
                     <div>
                        <label>Name:</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" required />
                    </div>
                    <Button variant="orange" type="submit" onClick={handleSubmit}>Submit</Button>

                </form>
                </div>
            )}
        </>
    )

}
export default Login;