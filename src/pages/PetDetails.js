import React, { useState } from "react";
import { useParams, Link, data } from "react-router-dom";

const pets = [
  {
    id: "d1",
    name: "Luna",
    type: "Dog",
    breed: "Labrador Retriever",
    age: "2 years",
    img: "https://retrieveradvice.com/wp-content/uploads/2022/11/2-Year-Old-Labrador-Retriever-1.jpg",
  },
  {
    id: "d2",
    name: "Milo",
    type: "Cat",
    breed: "Domestic Short Hair",
    age: "1 year",
    img: "https://res.cloudinary.com/petrescue/image/upload/a_0,c_crop,h_2268,w_2268,x_0,y_331/c_fill,h_600,w_900/ncbvp8xoiagewbawzqwp.jpg",
  },
  {
    id: "d3",
    name: "Bella",
    type: "Dog",
    breed: "Beagle",
    age: "3 years",
    img: "https://www.mydogsname.com/wp-content/uploads/2022/08/beagle-breed.jpg",
  },
  {
    id: "d4",
    name: "Nemo",
    type: "Fish",
    breed: "Clownfish",
    age: "6 months",
    img: "https://www.popsci.com/wp-content/uploads/2023/09/23/clownfish-scaled.jpeg?w=1440&h=810",
  },
  {
    id: "d5",
    name: "Coco",
    type: "Bird",
    breed: "Parrot",
    age: "1 year",
    img: "https://www.hindustantimes.com/ht-img/img/2023/05/29/550x309/robert-katzki-1janm1VVgpg-unsplash_1685360741199_1685360819631.jpg",
  },
  {
    id: "d6",
    name: "Rocky",
    type: "Dog",
    breed: "Husky",
    age: "4 years",
    img: "https://breedatlas.net/wp-content/uploads/2024/07/Siberian-Husky-That-One-Husky-Growth-Chart-That-Has-All-The-Important-Information--728x410.jpg.webp",
  },
];

export default function PetDetails() {
  const { id } = useParams();
  const petId=id;
  const pet = pets.find((p) => p.id === id);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [statusMsg, setStatusMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!pet) {
    return (
      <div className="container py-5">
        <p>Pet not found.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("");
    setSubmitting(true);

    try {
     
      const res = await fetch("http://localhost:5000/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petId: petId,
          fullName: form.fullName,
          email: form.email,
          reason: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setStatusMsg("❌ Adoption request failed: " + (data.error || "Unknown error"));
      } else {
        setStatusMsg("✅ Adoption request saved in database successfully!");
        setShowForm(false);
        setForm({ fullName: "", email: "", message: "" });
      }
    } catch (err) {
      setStatusMsg("❌ Backend not reachable or CORS issue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <Link to="/pets" className="btn btn-outline-primary mb-4">
        ← Back to Pets
      </Link>

      {statusMsg && (
        <div className="alert alert-info" style={{ maxWidth: 800 }}>
          {statusMsg}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <img src={pet.img} className="img-fluid rounded shadow" alt={pet.name} />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold" style={{ color: "#0147b3" }}>
            {pet.name}
          </h2>

          <p className="mt-3">
            <strong>Breed:</strong> {pet.breed}
          </p>
          <p>
            <strong>Age:</strong> {pet.age}
          </p>
          <p>
            <strong>Type:</strong> {pet.type}
          </p>

          <button
            className="btn btn-primary rounded-pill px-4 mt-3"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : `Adopt ${pet.name} ❤️`}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">
                  Adoption Request for{" "}
                  <span style={{ color: "#0147b3" }}>{pet.name}</span>
                </h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Your Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Why do you want to adopt {pet.name}? (optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success rounded-pill px-4"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Adoption Request"}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}