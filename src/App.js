import { HashRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Users from "./pages/Users.js";
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
import AdminAdoptions from "./pages/AdminAdoptions.js";
export default function App() {
 
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  ); 
  const [apiMsg]=useState("");
  
 useEffect(() => {
  Aos.init({ duration: 800, easing: "ease-out", once: true });
}, []);

const API_URL="http://localhost:5000";
  fetch(`${API_URL}/api/users`)
    .then((res) => res.json())
    .then(data => console.log("Users:", data))
    .catch(err => console.error(err));


  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <HashRouter>
      
      <Navbar toggleTheme={toggleTheme} theme={theme} isAdmin={isAdmin} />
      {apiMsg && (
        <div style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>
          {apiMsg}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/favorites" element={<Favorites />} />
          <Route path="/users" element={<Users />} />

        
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories" element={<SuccessStories />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adoption" element={<AdoptionProcess />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-adoptions" element={isAdmin ? <AdminAdoptions /> : <Navigate to="/login" replace />} />

        
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
