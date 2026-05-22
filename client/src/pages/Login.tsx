cdimport { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://ashish-dashboard.onrender.com/api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Login failed");
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={{ width: "100%", padding: 8, margin: "8px 0" }} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={{ width: "100%", padding: 8, margin: "8px 0" }} />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Login</button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
      <p style={{ marginTop: 15 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
