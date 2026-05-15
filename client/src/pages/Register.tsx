import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, { name, email, password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Registration failed");
      } else {
        setMessage("Registration failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} required
          style={{ width: "100%", padding: 8, margin: "8px 0" }} />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={{ width: "100%", padding: 8, margin: "8px 0" }} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={{ width: "100%", padding: 8, margin: "8px 0" }} />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Register</button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
      <p style={{ marginTop: 15 }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
