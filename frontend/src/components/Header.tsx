import React, { useState, useEffect } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import Cart from "../pages/Cart";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/users/check-auth");
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="header-container">
        <div className="header-left">
          <span className="header-nav-item">
            <Link to="list/men">Men</Link>
          </span>
          <span className="header-nav-item">
            <Link to="list/women">Women</Link>
          </span>
        </div>
        <div className="header-center">
          <div className="header-logo">
            <Link to="/">EVERLANE</Link>
          </div>
        </div>
        <div className="header-right">
          <div className="header-icon" onClick={() => setIsSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </div>
          <div
            className="header-icon"
            onClick={handleUserClick}
            style={{ cursor: "pointer" }}
          >
            <User size={20} strokeWidth={1.5} />
          </div>
          <div className="header-icon" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} strokeWidth={1.5} />
          </div>
        </div>
      </header>

      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Header;
