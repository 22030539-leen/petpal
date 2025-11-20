
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const basePets = [
  { id: 1, name: "Luna", type: "Dog", breed: "Labrador Retriever", age: "2 years", img: "https://retrieveradvice.com/wp-content/uploads/2022/11/2-Year-Old-Labrador-Retriever-1.jpg" },
  { id: 2, name: "Milo", type: "Cat", breed: "Domestic Short Hair", age: "1 year", img: "https://res.cloudinary.com/petrescue/image/upload/a_0,c_crop,h_2268,w_2268,x_0,y_331/c_fill,h_600,w_900/ncbvp8xoiagewbawzqwp.jpg" },
  { id: 3, name: "Bella", type: "Dog", breed: "Beagle", age: "3 years", img: "https://www.mydogsname.com/wp-content/uploads/2022/08/beagle-breed.jpg" },
  { id: 4, name: "Nemo", type: "Fish", breed: "Clownfish", age: "6 months", img: "https://www.popsci.com/wp-content/uploads/2023/09/23/clownfish-scaled.jpeg?w=1440&h=810" },
  { id: 5, name: "Coco", type: "Bird", breed: "Parrot", age: "1 year", img: "https://www.hindustantimes.com/ht-img/img/2023/05/29/550x309/robert-katzki-1janm1VVgpg-unsplash_1685360741199_1685360819631.jpg" },
  { id: 6, name: "Rocky", type: "Dog", breed: "Husky", age: "4 years", img: "https://breedatlas.net/wp-content/uploads/2024/07/Siberian-Husky-That-One-Husky-Growth-Chart-That-Has-All-The-Important-Information--728x410.jpg.webp" }
];

export default function Pets() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoritePets");
    return saved ? JSON.parse(saved) : [];
  });
  const [customPets, setCustomPets] = useState(() => {
    const saved = localStorage.getItem("customPets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritePets", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const saved = localStorage.getItem("customPets");
    if (saved) setCustomPets(JSON.parse(saved));
  }, []);

  const allpets = [...basePets, ...customPets];
  const pets = allpets.filter(pet => !pet.adopted);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const query = search.toLowerCase();

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(query) ||
      pet.type.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query);

    const matchesType = filterType === "All" || pet.type === filterType;

    return matchesType && matchesSearch;
  });

  return (
    <div className="container py-5 page-fade-in">
      <h2 className="text-center mb-4" style={{ color: "#0147b3" }}>
        Available Pets
      </h2>

      {/* Search bar */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control pet-search-input"
            placeholder="Search by name, type, or breed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col text-center">
          <button
            className={`btn filter-btn ${
              filterType === "All" ? "filter-btn-active" : ""
            }`}
            onClick={() => setFilterType("All")}
          >
            All
          </button>
          <button
            className={`btn filter-btn ${
              filterType === "Dog" ? "filter-btn-active" : ""
            }`}
            onClick={() => setFilterType("Dog")}
          >
            Dogs
          </button>
          <button
            className={`btn filter-btn ${
              filterType === "Cat" ? "filter-btn-active" : ""
            }`}
            onClick={() => setFilterType("Cat")}
          >
            Cats
          </button>
          <button
            className={`btn filter-btn ${
              filterType === "Bird" ? "filter-btn-active" : ""
            }`}
            onClick={() => setFilterType("Bird")}
          >
            Birds
          </button>
          <button
            className={`btn filter-btn ${
              filterType === "Fish" ? "filter-btn-active" : ""
            }`}
            onClick={() => setFilterType("Fish")}
          >
            Fish
          </button>
        </div>
      </div>

      {/* If no pets match */}
      {filteredPets.length === 0 && (
        <p className="text-center text-muted">
          No pets match your filters or search yet 🐾
        </p>
      )}

      <div className="row g-4">
        {filteredPets.map((pet) => {
          const isFav = favorites.includes(pet.id);
          return (
            <div className="col-md-4" key={pet.id}>
              <div className="card h-100 shadow-sm card-hover">
                <img
                  src={pet.img}
                  alt={pet.name}
                  className="card-img-top pet-card-img"
                />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: "#0147b3" }}>
                    {pet.name}
                  </h5>
                  <p className="card-text mb-1">{pet.breed}</p>
                  <p className="card-text text-muted">{pet.age}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className={`btn favorite-btn ${isFav ? "favorite-btn-active" : ""}`}
                      onClick={() => toggleFavorite(pet.id)}
                    >
                      {isFav ? "♥" : "♡"}
                    </button>
                    <Link
                      to={`/pets/${pet.id}`}
                      className="btn btn-primary rounded-pill px-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
