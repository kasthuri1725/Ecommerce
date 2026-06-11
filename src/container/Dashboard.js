import React from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

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
  return <Loader />;
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