import React, { useEffect, useState } from "react";

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => setPets(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load pets"));
  }, []);

  return (
    <div className="container py-4">
      <h2>Pets</h2>
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Owner</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {pets.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No pets found</td>
            </tr>
          ) : (
            pets.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.age ?? "-"}</td>
                <td>{p.owner_name ? `${p.owner_name} (${p.owner_email})` : "-"}</td>
                <td>{p.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}