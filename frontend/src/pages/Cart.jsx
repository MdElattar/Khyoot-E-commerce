import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "./Cart.css"; // we will create this file below

const Cart = () => {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    updateCart,
    navigate,
  } = useContext(ShopContext);

  const FREE_DELIVERY_LIMIT = 2000;

  // Get product details by ID
  const getProduct = (id) => products.find((p) => p._id === id);

  const isCartEmpty = Object.keys(cartItems).length === 0;

  // 2️⃣ Calculate subtotal
  const subtotal = Object.keys(cartItems).reduce((acc, variantId) => {
    const item = cartItems[variantId];
    const product = getProduct(item.productId);

    if (!product) return acc;

    return acc + product.price * item.count;
  }, 0);

  // 3️⃣ Calculate delivery fee
  const effectiveDeliveryFee =
    isCartEmpty || subtotal >= FREE_DELIVERY_LIMIT ? 0 : Number(delivery_fee);

  // 4️⃣ Final total
  const total = subtotal + effectiveDeliveryFee;

  return (
    <div className="cart-page mt-24">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-container">
        {/* CART ITEMS */}
        <div className="cart-items">
          {isCartEmpty && (
            <p className="empty-cart-msg">Your cart is empty 🛒</p>
          )}

          {Object.keys(cartItems).map((variantId) => {
            const item = cartItems[variantId];
            const product = getProduct(item.productId);
            if (!product) return null;

            return (
              <div className="cart-item" key={variantId}>
                <img src={product.image[0]} alt="" className="cart-item-img" />

                <div className="cart-item-info ">
                  <h3>{product.name}</h3>
                  <p className="price text-[#007280]">
                    {currency} {product.price}
                  </p>

                  <p className="details">
                    Size: <span>{item.size}</span> | Color:{" "}
                    <span>{item.color}</span>
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="qty-delete-wrapper">
                    <div className="qty-box">
                      <button
                        className="qty-btn"
                        onClick={() => updateCart(variantId, "decrease")}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.count}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateCart(variantId, "increase")}
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      className="delete-btn"
                      onClick={() => updateCart(variantId, "remove")}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ORDER SUMMARY */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          {/* <div className="summary-row">
            <span>Subtotal</span>
            <span>
              {currency} {subtotal}
            </span>
          </div> */}

          {/* <div className="summary-row">
            <span>Delivery Fee</span>
            <span>
              {currency} {delivery_fee}
            </span>
          </div> */}

          {/* {!isCartEmpty && (
            <>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className="text-green-600">
                  {effectiveDeliveryFee === 0
                    ? "FREE"
                    : `${currency} ${effectiveDeliveryFee}`}
                </span>
              </div>

              {subtotal < FREE_DELIVERY_LIMIT && (
                <p className="free-delivery-note">
                  Spend {currency} {FREE_DELIVERY_LIMIT - subtotal} more to get
                  FREE delivery
                </p>
              )}
            </>
          )}
          <hr /> */}

          <div className="summary-total">
            <span>Total</span>
            <span>
              {currency} {total}
            </span>
          </div>

          <button
            className="checkout-btn"
            disabled={isCartEmpty}
            onClick={() => navigate("/place-order")}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
