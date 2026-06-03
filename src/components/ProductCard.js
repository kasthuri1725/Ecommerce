import { useState } from "react";
import { getsingleproduct } from "../services/ProductService";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  savedAmount,
  image,
  rating,
  available,
  addToCart,
}) {

  const [open, setOpen] = useState(false);

  const [qty, setQty] = useState(1);

  const [selectedproduct, setselectedproduct] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // TOTAL
  const total = price * qty;

  const showDetails = async (id) => {
    try {
      setLoading(true);
      const data = await getsingleproduct(id);
      console.log(data, "SINGLE PRODUCT");
      console.log(`https://fakestoreapi.com/products/${id}`);
      setselectedproduct(data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ADD TO CART
  const handleAdd = () => {
    
    const originalPrice = Math.round(price * 1.25);

const savedAmount = Math.round(
  (originalPrice - price) * qty
);

    const product = {

      id,

      title,

      price,

      originalPrice,

      savedAmount,

      image,

      rating,

      qty,

      total

    };

    console.log(product);

    addToCart(product);

    setOpen(false);

  };

  // BUY NOW
  const handleBuyNow = () => {

    alert(`${title} Ordered Successfully ❤️`);

  };

  return (
    <>

      {/* PRODUCT CARD */}

      <div className="product-card">

        {/* IMAGE */}

        <img
          src={image}
          alt={title}
          className="product-image"
          onClick={() => showDetails(id)}
          style={{ cursor: "pointer" }}
        />

        {/* NAME */}

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

        {/* AVAILABLE */}

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

        {/* BUTTON */}

        <button
          className="add-cart-btn"
          disabled={!available}
          onClick={() => showDetails(id)}
        >
          

          {available
            ? "View Details"
            : "Unavailable"}

        </button>

      </div>

      {/* POPUP */}

      {open && (

        <div
          className="popup-overlay"
          onClick={() => setOpen(false)}
        >

          <div
            className="popup-box"
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "350px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "10px"
            }}
          >

            {loading ? (

              <h2>Loading...</h2>

            ) : (

              <>

                <img
                  src={selectedproduct?.image || image}
                  alt={title}
                  className="popup-image"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "contain",
                    marginBottom: "10px"
                  }}
                />

                <h2 className="popup-title">
                  {selectedproduct?.title || title}
                </h2>

                <p className="popup-rating">
                  ⭐ {rating?.rate || rating} / 5
                </p>

                <h2 className="popup-price">
                  ₹ {selectedproduct?.price || price}
                </h2>

                {/* PRODUCT DETAILS */}

                <p style={{ marginTop: "10px" }}>
                  {selectedproduct?.description}
                </p>

                <p>
                  Category :
                  <b>
                    {" "}
                    {selectedproduct?.category}
                  </b>
                </p>

                <p>
                  Availability :
                  <b>
                    {available
                      ? " In Stock"
                      : " Out Of Stock"}
                  </b>
                </p>

                {/* QUANTITY */}

                <div className="qty-box">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      setQty(
                        qty > 1
                          ? qty - 1
                          : 1
                      )
                    }
                  >
                    -
                  </button>

                  <span className="qty-number">
                    {qty}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      setQty(qty + 1)
                    }
                  >
                    +
                  </button>

                </div>

                {/* TOTAL */}

                <h3 className="total-text">
                  Total : ₹ {total}
                </h3>

                {/* BUTTONS */}

                <div className="popup-buttons">

                  <button
                    className="cart-btn"
                    onClick={handleAdd}
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

               <div
                className="product-card"
                onClick={()=>
                  navigate(`/product/${id}`)

                }
                >

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </>
  );
}

