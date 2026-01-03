import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  
  const isAdmin = localStorage.getItem("isAdmin") === "true";


  useEffect(() => {
    const loadUsers = async () => {
      try {
        setError("");

        
        if (!isAdmin) {
          setUsers([]);
          return;
        }

        const res = await fetch(`${API_BASE}/api/users`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to load users");

        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load users");
        setUsers([]);
      }
    };

    loadUsers();
  }, [isAdmin]);

 
  if (!isAdmin) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Access denied. Admin only.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3" style={{ color: "#0147b3" }}>
        Users
      </h2>

      {error && <div className="alert alert-warning">⚠️ {error}</div>}

      {!error && users.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id ?? idx}>
                  <td>{u.id ?? idx + 1}</td>
                  <td>{u.name ?? "-"}</td>
                  <td>{u.email ?? "-"}</td>
                  <td>{u.role ?? "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}