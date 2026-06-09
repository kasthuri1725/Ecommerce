import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = () => {
      const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

      setItems(wishlist);
    };

    loadWishlist();

    // 🔥 updates if wishlist changes in other tabs/pages
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  return (
    <div className="back-btn-wrapper">

      <BackButton />

      <h1>❤️ My Wishlist</h1>

      {items.length === 0 ? (
        <h2>No Wishlist Items</h2>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="wishlist-card"
            onClick={() => navigate(`/product/${Number(item.id)}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="wishlist-image"
            />

            <div className="wishlist-info">
              <h3>{item.title}</h3>
              <p>₹ {item.price}</p>
              <p>⭐ {item.rating?.rate || item.rating}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}