import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ darkMode }) => {
  return (
    <nav className={`main-navbar ${darkMode ? "dark" : "light"}`}>
      <div className="logo">🌱 Carbon Wallet</div>
      <div className="nav-links">
        <Link to="/">Checkout</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
};


export default Navbar;
