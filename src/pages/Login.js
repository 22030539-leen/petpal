import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAdmin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isAdminLocal, setIsAdminLocal] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@petpal.com" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);       // ⭐ update App state
      setIsAdminLocal(true);  // update local flag for this component
      setError("");
      navigate("/admin");
    } else {
      setError("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);        // ⭐ update App state
    setIsAdminLocal(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ color: "#0147b3" }}>
        Login
      </h2>

      {isAdminLocal ? (
        <div className="col-md-6 mx-auto text-center">
          <p className="mb-3">
            You are currently logged in as <strong>Admin</strong>.
          </p>
          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      ) : (
        <form className="col-md-6 mx-auto" onSubmit={handleLogin}>
          {error && <p className="text-danger text-center">{error}</p>}

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email (admin@petpal.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password (1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
}