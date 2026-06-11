import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  if (!product) {
  return <Loader />;
}

  const total = (product.price * qty).toFixed(2);

  const handleAddToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty,
      total,
    };

    cart.push(item);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart 🛒");
  };

  const handleBuyNow = () => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const order = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      qty,
      total,
    };

    orders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    alert(`${product.title} Ordered Successfully ❤️`);

    navigate("/orders");
  };

  return (
    <div className="product-details-page">

       <BackButton />

      {/* LEFT */}
      <div className="details-left">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* RIGHT */}
      <div className="details-right">

        <h1>{product.title}</h1>

        <p className="rating">
          ⭐ {product.rating?.rate} / 5
        </p>

        <h2>₹ {product.price}</h2>

        <p>{product.description}</p>

        <p>
          Category:
          <b> {product.category}</b>
        </p>

        <p>
          Availability:
          <b> In Stock</b>
        </p>

        <h3 className="total-text">
          Total : ₹ {total}
        </h3>

        <div className="qty-box">
          <button
            className="qty-btn"
            onClick={() =>
              setQty(qty > 1 ? qty - 1 : 1)
            }
          >
            -
          </button>

          <span className="qty-number">
            {qty}
          </span>

          <button
            className="qty-btn"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>

        <div className="popup-buttons">
          <button
            className="cart-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <button
            className="buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}