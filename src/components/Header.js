import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({handleLogout}) {

  const [cartCount, setCartCount] = useState(0);

 useEffect(() => {

  const updateCartCount = () => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.length);

  };

  updateCartCount();

  window.addEventListener("storage", updateCartCount);

  const interval = setInterval(updateCartCount, 500);

  return () => {

    window.removeEventListener(
      "storage",
      updateCartCount
    );

    clearInterval(interval);

  };

}, []);

  return (
    <div className="header">

      <h1 className="logo">Makeup Accessories</h1>

      <div className="nav-section">

        <Link to="/">
          <button className="nav-btn">Home</button>
        </Link>

        <input
          className="search-box"
          type="text"
          placeholder="Search products..."
        />

        <Link to="/cart">
          <button className="cart-nav-btn">
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </Link> 

        <Link to="/">
       <button className="nav-btn" onClick={() => handleLogout()}>Logout</button>
        </Link>
      

      </div>

    </div>
  );
}