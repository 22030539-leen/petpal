import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function AdminAdoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/api/adoptions`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load adoptions");
      setAdoptions(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setAdoptions([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold" style={{ color: "#0147b3" }}>Adoption Requests</h2>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          {adoptions.length === 0 ? (
            <p className="text-muted mb-0">No adoption requests yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pet ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.petId}</td>
                      <td>{a.fullName}</td>
                      <td>{a.email}</td>
                      <td style={{ maxWidth: 250 }}>{a.reason}</td>
                      <td>{a.status}</td>
                      <td>{a.created_at || a.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <button className="btn btn-outline-primary mt-3" onClick={load}>
        Refresh
      </button>
    </div>
  );
}