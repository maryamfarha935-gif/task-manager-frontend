import { useState } from 'react';

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    fetch("https://task-manager-backend-production-3640.up.railway.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        if (data.message === "Registration successful!") {
          setTimeout(() => goToLogin(), 1500);
        }
      });
  };

  return (
    <div className="container">
      <h1>📝 Register</h1>

      <div className="input-section" style={{ flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="add-btn" onClick={handleRegister}>Register</button>

        {message && (
          <p style={{ color: message === "Registration successful!" ? "green" : "red" }}>
            {message}
          </p>
        )}

        <p>Already have an account?
          <span
            onClick={goToLogin}
            style={{ color: "#3498db", cursor: "pointer", marginLeft: "5px" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;