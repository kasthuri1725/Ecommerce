import React, { useState} from "react";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../container/Home";
import Cart from "../components/Cart";
import ProductDetails from "../components/ProductDetails";

export default function Router() {

  const [cart, setCart] = useState([]);

  return (

    <HashRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        

        <Route
          path="/home"
          element={<Home
            cart={cart}
            setCart={setCart} />}
        />
      

        <Route
          path="/cart"
          element={<Cart
            cart={cart}
            setCart={setCart} />}
        />
        
         <Route
           path="/product/:id"
           element={<ProductDetails/>}
           /> 

            <Route path="/wishlist" element={<Wishlist />} />
<Route path="/orders" element={<Orders />} />
<Route path="/profile" element={<Profile />} />


      </Routes>

    </HashRouter>

  );
}