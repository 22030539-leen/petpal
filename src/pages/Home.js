import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-hero page-fade-in">
      <div className="container py-5">

        {/* HERO SECTION */}
        <div className="row align-items-center g-4">

          {/* LEFT CONTENT */}
          <div className="col-md-6" data-aos="fade-right">
            <span className="home-badge mb-3" data-aos="zoom-in" data-aos-delay="150">
              Adopt. Love. Repeat. 🐾
            </span>

            <h1 className="home-title mb-3" data-aos="fade-up" data-aos-delay="200">
              For the <span className="home-title-highlight">LOVE</span> of Pets
            </h1>

            <p className="home-subtitle mb-4" data-aos="fade-up" data-aos-delay="300">
              PetPal helps you find loving dogs, cats, birds and more who are
              waiting for their forever homes. Learn about adoption, explore
              pet profiles, and read real success stories.
            </p>

            <div
              className="d-flex flex-wrap gap-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <Link
                to="/pets"
                className="btn btn-primary btn-lg rounded-pill px-4 btn-animated"
              >
                Browse Pets
              </Link>

              <Link
                to="/adoption"
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Adoption Process
              </Link>
            </div>

            {/* STATS */}
            <div
              className="d-flex flex-wrap gap-4 home-stats"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div>
                <div className="home-stat-number">120+</div>
                <div className="home-stat-label">Pets adopted</div>
              </div>
              <div>
                <div className="home-stat-number">15</div>
                <div className="home-stat-label">Partner shelters</div>
              </div>
              <div>
                <div className="home-stat-number">100%</div>
                <div className="home-stat-label">Love guaranteed</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6" data-aos="zoom-in">
            <div className="home-hero-card shadow-sm card-hover">
              <img
                src="https://images.pexels.com/photos/5731869/pexels-photo-5731869.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy person with dog"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <section className="home-features mt-5">
          <h2
            className="text-center mb-4"
            style={{ color: "#0147b3" }}
            data-aos="fade-up"
          >
            Playfully connecting people who LOVE pets!
          </h2>

          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
              <div className="home-feature-card card-hover">
                <div className="home-feature-icon">🐶</div>
                <h5>Adopt a Buddy</h5>
                <p>
                  Find loving dogs, cats, and more waiting for a forever home.
                </p>
                <Link to="/adoption" className="home-feature-link">
                  How to adopt  →
                </Link>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="250">
              <div className="home-feature-card card-hover">
                <div className="home-feature-icon">🌍</div>
                <h5>Pet Profiles</h5>
                <p>
                  View detailed profiles, pictures, and personality info.
                </p>
                <Link to="/pets" className="home-feature-link"
                onClick={ () => window.scrollTo({top:0,left:0,behavior:"smooth"})}>
                  View profiles →
                </Link>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="350">
              <div className="home-feature-card card-hover">
                <div className="home-feature-icon">❤️</div>
                <h5>Connect & Adopt</h5>
                <p>
                  Contact shelters and adopt safely through our platform.
                </p>
                <Link to="/login" className="home-feature-link">
                  Learn how it works →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}