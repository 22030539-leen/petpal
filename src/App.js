import { HashRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Pets from "./pages/Pets.js";
import PetDetails from "./pages/PetDetails.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import SuccessStories from "./pages/SuccessStories.js";
import Donate from "./pages/Donate.js";
import Contact from "./pages/Contact.js";
import AdoptionProcess from "./pages/AdoptionProcess.js";
import Shelters from "./pages/Shelters.js";
import Favorites from "./pages/Favorites.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import AdminLogin from "./pages/AdminLogin.js";
import "./styles.css";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
export default function App() {
  // ⭐ THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // ⭐ ADMIN STATE (READ FROM LOCALSTORAGE ONCE)
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // AOS INIT
  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-out", once: true });
  }, []);

  // APPLY THEME
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <HashRouter>
      {/* ⭐ PASS isAdmin TO NAVBAR */}
      <Navbar toggleTheme={toggleTheme} theme={theme} isAdmin={isAdmin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* ⭐ PASS setIsAdmin TO LOGIN */}
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories" element={<SuccessStories />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adoption" element={<AdoptionProcess />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ⭐ PROTECTED ADMIN ROUTE USES isAdmin STATE */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <Footer />
    </HashRouter>
  );
}

