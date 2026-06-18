import { useState } from 'react';

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    fetch("https://task-manager-backend-production-3640.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Login successful!") {
          onLogin(data.name);
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="container">
      <h1>🔐 Login</h1>

      <div className="input-section" style={{ flexDirection: "column", gap: "12px" }}>
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
        <button className="add-btn" onClick={handleLogin}>Login</button>

        {message && <p style={{ color: "red" }}>{message}</p>}

        <p>Don't have an account?
          <span
            onClick={goToRegister}
            style={{ color: "#3498db", cursor: "pointer", marginLeft: "5px" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;