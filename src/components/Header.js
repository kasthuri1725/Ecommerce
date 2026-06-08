import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({handleLogout}) {

  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

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
          
           <div
  className="login-dropdown"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  <button
  type="button"
  className="nav-btn"
>
 👤 Login ▼
</button>

  {showDropdown && (
    <div className="dropdown-menu">
     
    
      <div className="signup-row">
        <span>New customer?</span>
        <span className="signup-text">Sign Up</span>
      </div>

      <Link to="/profile" className="dropdown-item">
        👤 My Profile
      </Link>

      <Link to="/orders" className="dropdown-item">
        📦 Orders
      </Link>

      <Link to="/wishlist" className="dropdown-item">
        ❤️ Wishlist
      </Link>

      <Link to="/rewards" className="dropdown-item">
        🎁 Rewards
      </Link>

      <Link to="/notifications" className="dropdown-item">
        🔔 Notification Preferences
      </Link>

      <button
        className="dropdown-item logout-item"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  )}
</div>
          
         
      

      </div>

    </div>
  );
}