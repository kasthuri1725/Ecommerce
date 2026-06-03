import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    axios
      .get(
        `https://dummyjson.com/products/${id}`
      )
      .then((res) => {

        setProduct(res.data);

      });

  }, [id]);

  if (!product) {

    return <h1>Loading...</h1>;

  }

  return (

    <div>

      <img
        src={product.thumbnail}
        alt={product.title}
        width="300"
      />

      <h1>{product.title}</h1>

      <h2>₹ {product.price}</h2>

      <p>{product.description}</p>

    </div>
  );
}