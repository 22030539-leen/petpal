import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ toggleTheme, theme, isAdmin }) {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          🐾 PetPal
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          ☰
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/pets"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Pets
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Favorites
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/adoption"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Adoption
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/stories"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Stories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active-link" : "")
                }
              >
                Contact
              </NavLink>
            </li>

            {/* 👇 Only show Admin if logged in */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active-link" : "")
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}

            {/* Theme toggle */}
            <li className="nav-item d-flex align-items-center ms-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={toggleTheme}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>

            {/* Login button */}
            <li className="nav-item ms-3">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  "nav-link btn btn-primary rounded-pill px-3 ms-2" +
                  (isActive ? " active-link" : "")
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}