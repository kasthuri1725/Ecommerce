import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

  const cancelOrder = (index) => {

  const updatedOrders =
    orders.filter((item, i) => i !== index);

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );
};



  return (
    <div className="back-btn-up">

      <BackButton />

      <h1>
              My Orders
       </h1>

      {orders.length === 0 ? (

        <h3 className="empty-cart">
          No Orders Yet 😔
        </h3>

      ) : (

        orders.map((item, index) => (

          <div
            key={index}
            className="cart-card"
          >

            <img
              src={item.image}
              alt={item.title}
              className="cart-image"
            />

            <div className="cart-details">

              <h3>{item.title}</h3>

              <p>
                Quantity : {item.qty}
              </p>

              <p>
                Price : ₹ {item.price}
              </p>

              <h4>
                Total : ₹ {item.total}
              </h4>
              
                <button
    className="cancel-order-btn"
   onClick={() => {
  if (window.confirm("Cancel this order?")) {
    cancelOrder(index);
  }
}}
  >
    Cancel Order
  </button>


            </div>

          </div>

        ))

      )}

    </div>
  );
}