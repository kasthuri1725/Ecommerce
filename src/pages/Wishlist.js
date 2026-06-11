import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Icon } from "@iconify/react";

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
   

  const removeFromWishlist = (id) => {
  const updatedWishlist = items.filter(
    (item) => String(item.id) !== String(id)
  );

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  setItems(updatedWishlist);
};




  return (
    <div className="back-btn-up">

      <BackButton />

      <h1> My Wishlist</h1>

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

           <button
  className="wishlist-heart-btn"
  onClick={(e) => {
    e.stopPropagation();
    removeFromWishlist(item.id);
  }}
>
  <Icon
    icon="mdi:heart"
    color="red"
    width="24"
  />
</button>

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