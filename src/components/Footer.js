import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-4">
        <div className="row align-items-center gy-3">
          {/* Left: logo / text */}
          <div className="col-md-4 text-center text-md-start">
            <div className="footer-brand">🐾 PetPal</div>
            <div className="footer-copy">
              © {new Date().getFullYear()} PetPal — Made with ❤️ for pets.
            </div>
          </div>

          {/* Middle: links */}
          <div className="col-md-4 text-center">
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/adoption">Adoption</Link>
              <Link to="/stories">Stories</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-small-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          {/* Right: “social” icons */}
          <div className="col-md-4 text-center text-md-end">
            <div className="footer-social">
              <a href="#instagram" aria-label="Instagram">📸</a>
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#twitter" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}