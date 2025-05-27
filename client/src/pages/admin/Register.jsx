import { useContext, useState } from "react";
import Button from "../../components/Button";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import GoBack from "../../components/admin/GoBack";
import SuccessModal from "../../components/modals/SuccessModal";
import { AuthContext } from "../../context/AuthContext";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const {token} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(API.REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({ email, name, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowModal(true); // Show success modal
            } else {
                setError(data.message || "Registration failed.");
            }
            console.log("_______response in register______");
            console.log(response);
        } catch (error) {
            console.error("Error registering the user: ", error);
            setError("Something went wrong. Please try again.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/admin/admin-dashboard");
    };

    return (
        <>
            <GoBack url={"/admin/admin-dashboard"} />
            <h3>Register new admin</h3>

            <div className="admin-container">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="question-input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="question-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="question-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>

            {showModal && (
                <SuccessModal
                    message="Admin registered successfully!"
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default Register;
