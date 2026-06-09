import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] =
    useState(null);

  // LOAD CART
  useEffect(() => {

    const items =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(items);

  }, []);

  // REMOVE ITEM
  const removeItem = (index) => {

    const updatedCart =
      cartItems.filter((item, i) => i !== index);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // GRAND TOTAL
  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + item.total,
    0
  );

  // BUY NOW
  const handleBuy = () => {

    alert(
      "Order Placed Successfully ❤️"
    );

    localStorage.removeItem("cart");

    setCartItems([]);

  };

  return (

    <div className="cart-container">
        <BackButton />

      {/* TITLE */}
      <h1 className="cart-title">
        🛒 My Cart
      </h1>

      {/* EMPTY */}
      {cartItems.length === 0 ? (

        <h3 className="empty-cart">
          Cart is Empty 😔
        </h3>

      ) : (

        <>
          {/* PRODUCTS */}
          {cartItems.map((item, index) => {

  const discountPercent = item.originalPrice
    ? Math.round(
        ((item.originalPrice - item.price) /
          item.originalPrice) * 100
      )
    : 0;

  return (

            <div
              key={index}
              className="cart-card"
              onClick={() =>
                setSelectedItem(item)
              }
              style={{
                cursor: "pointer"
              }}
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="cart-image"
              />

              {/* DETAILS */}
              <div className="cart-details">

                <h3>{item.title}</h3>

                <p>
                  ⭐ {item.rating?.rate || item.rating} / 5
                </p>

                <p>
                  Quantity : {item.qty}
                </p>

                <p>
                  MRP : ₹ {item.originalPrice}
                  </p>

                <p
                style={{
                  color: "green",
                  fontWeight: "bold"
                  }}
                  > 
                    Discount : {discountPercent}% OFF
                    </p>

                    <p>
                   Selling Price : ₹ {item.price}
                </p>
                 
                 <p
                 style={{
                  color:"green",
                  fontWeight: "bold"
                 }}
                 >
                  you save : ₹ {item.savedAmount}
                 </p>

                 <h4>
                  Final Price : ₹ {item.total}
                  </h4>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  onClick={(e) => {

                    e.stopPropagation();

                    removeItem(index);

                  }}
                >
                  Remove
                </button>

              </div>

            </div>

          );})}

          {/* TOTAL */}
          <div className="grand-total-box">

            <h2>
              Grand Total : ₹ {grandTotal}
            </h2>

            <button
              className="buy-now-btn"
              onClick={handleBuy}
            >
              Buy Now
            </button>

          </div>

        </>
      )}

      {/* DETAILS POPUP */}
      {selectedItem && (

        <div
          className="popup-overlay"
          onClick={() =>
            setSelectedItem(null)
          }
        >

          <div
            className="popup-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="popup-image"
            />

            <h2>
              {selectedItem.title}
            </h2>

            <p>
              ⭐ {selectedItem.rating?.rate || selectedItem.rating} / 5
            </p>

            <p>
              Quantity : {selectedItem.qty}
            </p>

            <h3>
              ₹ {selectedItem.total}
            </h3>

            <button
              className="buy-now-btn"
              onClick={() =>
                setSelectedItem(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}