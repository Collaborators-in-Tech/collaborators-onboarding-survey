import Button from "./Button";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("authToken");
        console.log("token: ",token);

        try {
            const response = await fetch(API.LOGOUT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log("response is",response);
            // const data = await response.json();

            if (response.ok) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                navigate("/admin");
            } else {
                console.error("Logout failed:", data);
            }

        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <Button onClick={handleLogout} className="mx-2">Logout</Button>
    );
};

export default Logout;
