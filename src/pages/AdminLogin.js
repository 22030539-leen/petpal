import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Wrong password. Try again.");
    }
  };

  return (
    <div className="container py-5 page-fade-in">
      <h2 style={{ color: "#0147b3" }}>Admin Login</h2>
      <p className="text-muted mb-4">
        Enter the admin password to access the dashboard.
      </p>

      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card shadow-sm p-3">
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="admin123"
              />
            </div>

            {error && <div className="text-danger mb-2">{error}</div>}

            <button type="submit" className="btn btn-primary rounded-pill px-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}