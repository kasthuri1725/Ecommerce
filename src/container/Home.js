import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Dashboard from "../container/Dashboard";
import { getProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
// import LoaderIcon from "@iconify-react/codex/loader";

function Home({ cart, setCart }) {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  console.log(products,"products state");
  console.log(loading,"loading state");


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        console.log(products, "fetched products");
        const updatedProducts = products.map((item) => ({
  ...item,
  originalPrice: Math.round(item.price * 1.25)
}));

setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
 
 const handleLogout = () => {
  localStorage.removeItem("token");

  console.log("REMOVE");
 navigate("/");
 };


  return (  

    <div>
      <Header handleLogout={handleLogout}/>

      <Dashboard
  products={products}
  loading={loading}
  cart={cart}
  setCart={setCart}
/>

    </div>
  );
}

export default Home; 
