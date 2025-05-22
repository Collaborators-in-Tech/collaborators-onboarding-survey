import { useState, useContext } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { AuthContext } from "../../context/AuthContext.jsx"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token && data.user) {
        login(data.user, data.token);  // update context
        navigate("/admin/admin-dashboard");
      } else {
        console.error("Login failed: no token/user returned");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
