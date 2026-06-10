import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FaSearch } from "react-icons/fa";


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

      <h1 className="logo">Shopsy</h1>

      <div className="nav-section">

        <Link to="/home" className="nav-link">
          <button className="nav-btn">
            <Icon icon="mdi:home" className="nav-icon" />
            Home
            </button>
        </Link>

        <div className="search-container">
  <FaSearch className="search-icon" />

        <input
          className="search-box"
          type="text"
          placeholder="Search products..."
        />
        </div>

        <Link to="/cart"  className="nav-link">
          <button className="cart-nav-btn">
          <Icon icon="mdi:cart-outline" className="nav-icon" />
             Cart <span className="cart-count">{cartCount}</span>
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
  <Icon icon="mdi:account-circle" className="nav-icon" />
  Profile ▼
</button>

  
  {showDropdown && (
    <div className="dropdown-menu">
     
    
      <div className="signup-row">
        <span>New customer?</span>
        <span className="signup-text">Sign Up</span>
      </div>

      <Link to="/profile" className="dropdown-item">
        <Icon icon="mdi:account-circle" className="nav-icon" />
         My Profile
      </Link>

      <Link to="/orders" className="dropdown-item">
        <Icon icon="mdi:package-variant" className="nav-icon" />
         Orders
      </Link>

      <Link to="/wishlist" className="dropdown-item">
        <Icon icon="mdi:heart" className="nav-icon" />
        Wishlist
      </Link>

      <Link to="/rewards" className="dropdown-item">
      <Icon icon="mdi:gift" className="nav-icon" />
      Rewards
      </Link>

      <Link to="/notifications" className="dropdown-item">
        <Icon icon="mdi:bell" className="nav-icon" />
         Notification Preferences
      </Link>

      <button
        className="dropdown-item logout-item"
        onClick={handleLogout}
      >
        <Icon icon="mdi:logout" className="nav-icon" />
        logout
      </button>

    </div>
  )}
</div>
          
         
      

      </div>

    </div>
  );
}