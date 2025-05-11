import { useState } from "react";
import Button from "./Button";

const Register = ({isOpen,toggleForm}) => {
    const handleRegister = () => {
        toggleForm()
        console.log("register button")
    }
    const handleSubmit = () => {

    }
    return(
        <>
            <Button variant="purple" onClick={handleRegister}> Register</Button>

            {isOpen && (
                <div>
                     <h3>Register here</h3>
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
export default Register;