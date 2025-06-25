import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="main-navbar">
      <div className="logo">🌱 Carbon Wallet</div>
      <div className="nav-links">
        <Link to="/">Checkout</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
