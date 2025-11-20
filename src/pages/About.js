import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center" style={{ color: "#0147b3" }}>About PetPal</h2>

      <p className="text-center mt-4" style={{ fontSize: "18px" }}>
        PetPal is created for pet lovers to connect, adopt, and share love with animals.
        Our mission is to make the world a happier place by helping pets find homes.
      </p>

      <div className="text-center mt-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/194/194279.png"
          width="200"
          alt="pets"
        />
      </div>
    </div>
  );
}