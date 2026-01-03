import React, { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000"; 

export default function AdminDashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    image: "",
  });

 
  const fetchPets = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/pets`);
      if (!res.ok) throw new Error(`Failed to load pets (${res.status})`);

      const data = await res.json();

      
      setPets(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load pets");
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  
  const customPets = useMemo(() => {
    return (Array.isArray(pets) ? pets : []).filter((p) => Number(p.adopted) === 0);
  }, [pets]);

  const resetForm = () => {
    setForm({ name: "", type: "", breed: "", age: "", image: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  

    const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const payload = {
    name: form.name,
    type: form.type,
    breed: form.breed,
    age: form.age,        
    image: form.image,
  };

 
  if (!payload.name || !payload.type || !payload.breed || !payload.age || !payload.image) {
    setError("Please fill all fields.");
    return;
  }

  try {
    if (editingId) {
      
      const res = await fetch(`${API_BASE}/api/pets/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update pet");

    } else {
      
      const res = await fetch(`${API_BASE}/api/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add pet");
    }

    
    await fetchPets();

    
    resetForm();

  } catch (err) {
    setError(err.message || "Something went wrong");
  }
};

  const handleEdit = (pet) => {
    setEditingId(pet.id);
    setForm({
      name: pet.name || "",
      type: pet.type || "",
      breed: pet.breed || "",
      age: pet.age || "",
      image: pet.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pet?")) return;

    try {
      setError("");
      const res = await fetch(`${API_BASE}/api/pets/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to delete pet");

      setPets((prev) => (Array.isArray(prev) ? prev : []).filter((p) => p.id !== id));
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete");
    }
  };

const handleMarkAdopted = async (id) => {
  try {
    setError("");

    const res = await fetch(`${API_BASE}/api/pets/${id}/adopted`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adopted: 1 }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to mark adopted");
    }

   
    setPets((prev) =>
      (Array.isArray(prev) ? prev : []).map((p) =>
        p.id === id ? { ...p, adopted: 1 } : p
      )
    );

    
    if (editingId === id) resetForm();
  } catch (e) {
    setError(e.message || "Failed to mark adopted");
  }
};

  return (
    <div className="container py-5">
      <h2 className="fw-bold" style={{ color: "#0147b3" }}>
        Admin Dashboard
      </h2>
      <p className="text-muted">
        Add, edit, or manage pets. Custom pets appear on the Pets page (unless marked as adopted).
      </p>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">❌</span>
          <div>{error}</div>
        </div>
      )}

      
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3 fw-bold">
                {editingId ? "Edit Pet" : "Add New Pet"}
              </h5>

              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="e.g. Max"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

               
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Fish">Fish</option>
                  </select>
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Breed</label>
                  <input
                    type="text"
                    className="form-control"
                    name="breed"
                    placeholder="e.g. Golden Retriever"
                    value={form.breed}
                    onChange={handleChange}
                    required
                  />
                </div>

              
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="text"
                    className="form-control"
                    name="age"
                    placeholder="e.g. 2 years"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {editingId ? "Save Changes" : "Add Pet"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        
        <div className="col-lg-6">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="fw-bold mb-0">Custom Pets ({customPets.length})</h5>
            <button className="btn btn-outline-primary btn-sm" onClick={fetchPets}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="card shadow-sm">
              <div className="card-body">Loading...</div>
            </div>
          ) : customPets.length === 0 ? (
            <div className="card shadow-sm">
              <div className="card-body text-muted">No custom pets yet.</div>
            </div>
          ) : (
            <div className="row g-3">
              {customPets.map((p) => (
                <div key={p.id} className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body d-flex gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/80?text=No+Image";
                        }}
                      />

                      <div className="flex-grow-1">
                        <div className="fw-bold">{p.name}</div>
                        <div className="text-muted small">
                          {p.type} · {p.breed} · {p.age}
                        </div>
                      </div>

                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => handleMarkAdopted(p.id)}
                        >
                          Mark Adopted
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-muted small mt-3 mb-0">
            Note: “Mark Adopted” sets <code>adopted = 1</code>. Pets page should
            only show pets where <code>adopted = 0</code>.
          </p>
        </div>
      </div>
    </div>
  );
}