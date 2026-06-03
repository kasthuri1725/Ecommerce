import React from "react";
import ProductCard from "../components/ProductCard";

export default function Dashboard({
  products,
  loading,
  cart,
  setCart
}) {

  const addToCart = (product) => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...existingCart, product];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    alert("Added To Cart ❤️");
  };

  // LOADING
  if (loading) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        Loading...
      </h1>
    );
  }

  return (

    <div className="products-container">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          {...product}
          available={true}
          addToCart={addToCart}
        />

      ))}

    </div>
  );
}