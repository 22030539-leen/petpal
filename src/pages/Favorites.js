import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const allPets = [
  { id: "d1", name: "Luna", breed: "Labrador Retriever", age: "2 years", img: "https://retrieveradvice.com/wp-content/uploads/2022/11/2-Year-Old-Labrador-Retriever-1.jpg" },
  { id: "d2", name: "Milo", breed: "Domestic Short Hair", age: "1 year", img: "https://res.cloudinary.com/petrescue/image/upload/a_0,c_crop,h_2268,w_2268,x_0,y_331/c_fill,h_600,w_900/ncbvp8xoiagewbawzqwp.jpg" },
  { id: "d3", name: "Bella", breed: "Beagle", age: "3 years", img: "https://www.mydogsname.com/wp-content/uploads/2022/08/beagle-breed.jpg" },
  { id: "d4", name: "Nemo", breed: "Clownfish", age: "6 months", img: "https://www.popsci.com/wp-content/uploads/2023/09/23/clownfish-scaled.jpeg?w=1440&h=810" },
  { id: "d5", name: "Coco", breed: "Parrot", age: "1 year", img: "https://www.hindustantimes.com/ht-img/img/2023/05/29/550x309/robert-katzki-1janm1VVgpg-unsplash_1685360741199_1685360819631.jpg" },
  { id: "d6", name: "Rocky", breed: "Husky", age: "4 years", img: "https://breedatlas.net/wp-content/uploads/2024/07/Siberian-Husky-That-One-Husky-Growth-Chart-That-Has-All-The-Important-Information--728x410.jpg.webp" },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoritePets")) || [];
    setFavorites(saved);
  }, []);

  // Remove from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((favId) => favId !== id);
    setFavorites(updated);
    localStorage.setItem("favoritePets", JSON.stringify(updated));
  };

  const favoritePets = allPets.filter((pet) => favorites.includes(pet.id));

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ color: "#0147b3" }}>
        Your Favorite Pets ❤️
      </h2>

      {favoritePets.length === 0 ? (
        <p className="text-center text-muted">
          You don't have any favorite pets yet. Go to the Pets page and tap the ♥ button!
        </p>
      ) : (
        <div className="row g-4">
          {favoritePets.map((pet) => (
            <div className="col-md-4" key={pet.id}>
              <div className="card shadow-sm h-100">
                <img src={pet.img} className="card-img-top" alt={pet.name} />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: "#0147b3" }}>{pet.name}</h5>
                  <p className="card-text">{pet.breed}</p>
                  <p className="text-muted">{pet.age}</p>

                  <div className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/pets/${pet.id}`}
                      className="btn btn-primary rounded-pill px-4"
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-outline-danger rounded-pill px-4"
                      onClick={() => removeFavorite(pet.id)}
                    >
                      Remove ❤️
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}