import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  // All custom pets (from localStorage)
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem("customPets");
    return saved ? JSON.parse(saved) : [];
  });

  // Form state
  const [form, setForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    img: "",
  });

  // Which pet are we editing? (null = adding new)
  const [editing, setEditing] = useState(null);

  // Save pets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("customPets", JSON.stringify(pets));
  }, [pets]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update pet
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.breed.trim() ||
      !form.age.trim() ||
      !form.img.trim()
    ) {
      return;
    }

    if (editing) {
      // UPDATE existing pet
      const updatedPets = pets.map((pet) =>
        pet.id === editing ? { ...pet, ...form } : pet
      );
      setPets(updatedPets);
      setEditing(null);
    } else {
      // ADD new pet
      const newPet = {
        id: Date.now(),
        adopted: false, // default
        ...form,
      };
      setPets((prev) => [newPet, ...prev]);
    }

    // Reset form
    setForm({
      name: "",
      type: "Dog",
      breed: "",
      age: "",
      img: "",
    });
  };

  // Delete pet
  const handleDelete = (id) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
  };

  // Mark as adopted / not adopted
  const toggleAdopted = (id) => {
    const updated = pets.map((p) =>
      p.id === id ? { ...p, adopted: !p.adopted } : p
    );
    setPets(updated);
  };

  return (
    <div className="container py-5 page-fade-in">
      <h2 className="mb-3" style={{ color: "#0147b3" }}>
        Admin Dashboard
      </h2>
      <p className="text-muted mb-4">
        Add, edit, or manage pets. Custom pets appear on the Pets page (unless marked as adopted).
      </p>

      <div className="row">
        {/* LEFT: FORM */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">
                {editing ? "Edit Pet" : "Add New Pet"}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Max"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Fish</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Breed</label>
                  <input
                    className="form-control"
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    className="form-control"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="e.g. 2 years"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    className="form-control"
                    name="img"
                    value={form.img}
                    onChange={handleChange}
                    placeholder="Paste an image URL"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4"
                >
                  {editing ? "Save Changes" : "Add Pet"}
                </button>
                {editing && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4 ms-2"
                    onClick={() => {
                      setEditing(null);
                      setForm({
                        name: "",
                        type: "Dog",
                        breed: "",
                        age: "",
                        img: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT: LIST OF PETS */}
        <div className="col-md-6">
          <h5 className="mb-3">Custom Pets ({pets.length})</h5>

          {pets.length === 0 && (
            <p className="text-muted">No custom pets added yet.</p>
          )}

          {pets.map((pet) => (
            <div className="card mb-3 shadow-sm" key={pet.id}>
              <div className="card-body d-flex align-items-center">
                <img
                  src={pet.img}
                  alt={pet.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "12px",
                  }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">
                    {pet.name}{" "}
                    {pet.adopted && (
                      <span className="badge bg-success ms-1">
                        Adopted
                      </span>
                    )}
                  </h6>
                  <small className="text-muted">
                    {pet.type} • {pet.breed} • {pet.age}
                  </small>
                </div>

                <div className="ms-3 d-flex flex-column gap-1">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setEditing(pet.id);
                      setForm({
                        name: pet.name,
                        type: pet.type,
                        breed: pet.breed,
                        age: pet.age,
                        img: pet.img,
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={`btn btn-sm ${
                      pet.adopted ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => toggleAdopted(pet.id)}
                  >
                    {pet.adopted ? "Adopted ✔" : "Mark Adopted"}
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(pet.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}