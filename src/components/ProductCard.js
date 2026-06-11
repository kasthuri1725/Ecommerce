import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function ProductCard({
  id,
  title,
  price,
  image,
  rating,
  available,
}) {
  const navigate = useNavigate();

  const [imageLoading, setImageLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(
      (item) => String(item.id) === String(id)
    );

    setIsWishlisted(exists);
  }, [id]);

  const addToWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const product = {
      id,
      title,
      price,
      image,
      rating,
    };

    const exists = wishlist.some(
      (item) => String(item.id) === String(id)
    );

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => String(item.id) !== String(id)
      );
      setIsWishlisted(false);
      alert("Removed from Wishlist 💔");
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
      alert("Added to Wishlist ❤️");
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div className="product-card">
      {/* IMAGE */}
      <div className="image-container">
        <button
          className="heart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist();
          }}
        >
          {isWishlisted ? (
            <Icon
              icon="mdi:heart"
              color="red"
              width="22"
            />
          ) : (
            <Icon
              icon="mdi:heart-outline"
              color="black"
              width="22"
            />
          )}
        </button>

        <>
  {imageLoading && (
    <div className="image-loader">
      <Icon
        icon="svg-spinners:blocks-shuffle-3"
        width="40"
      />
    </div>
  )}

  <img
    src={image}
    alt={title}
    className="product-image"
    onLoad={() => setImageLoading(false)}
    onClick={() => navigate(`/product/${id}`)}
    style={{
      cursor: "pointer",
      display: imageLoading ? "none" : "block"
    }}
  />
</>
      </div>

      {/* TITLE */}
      <h2 className="product-title">
        {title}
      </h2>

      {/* RATING */}
      <div className="rating-box">
        ⭐ {rating?.rate || rating}
      </div>

      {/* PRICE */}
      <div className="price-section">
        <span className="product-price">
          ₹ {price}
        </span>

        <span className="offer-text">
          20% Off
        </span>
      </div>

      {/* STOCK */}
      <p
        className={
          available
            ? "stock-green"
            : "stock-red"
        }
      >
        {available
          ? "In Stock"
          : "Out Of Stock"}
      </p>

      {/* VIEW DETAILS */}
      <button
        className="add-cart-btn"
        disabled={!available}
        onClick={() => navigate(`/product/${id}`)}
      >
        {available
          ? "View Details"
          : "Unavailable"}
      </button>
    </div>
  );
}