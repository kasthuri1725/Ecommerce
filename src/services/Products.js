import React, { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import Loader from "../components/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  cconsole.log(products, "products");
const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchProducts();
  }, []);

    
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProducts();

        console.log(data, "FETCHED PRODUCTS");

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
    fetchsinglProducts();
  },[]);

  const fetchsinglProducts = async  () => {
    try{
      const data =await getSingloroducts();
      setsinglproducts(data);
    }catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
if (loading) {
  return <Loader />;
}


  return (
    <div className="p-5 grid grid-cols-4 gap-5">
      {products?.map((product) => (
        <div
          key={product.id}
          className="border p-3 rounded-xl shadow-md"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-52 object-contain"
          />

          <h2 className="font-bold mt-3">
            {product.title}
          </h2>

          <p className="text-gray-500">
            ${product.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Products;