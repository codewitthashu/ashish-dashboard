import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user._id}</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
