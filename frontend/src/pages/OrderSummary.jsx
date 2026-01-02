import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const FREE_DELIVERY_LIMIT = 2000;

const OrderSummary = ({ isFormValid, onSubmitHandler }) => {
  const { cartItems, products, currency, delivery_fee, navigate } =
    useContext(ShopContext);

  const getProduct = (id) => products.find((p) => p._id === id);

  const subtotal = Object.keys(cartItems).reduce((acc, variantId) => {
    const item = cartItems[variantId];
    const product = getProduct(item.productId);
    if (!product) return acc;
    return acc + product.price * item.count;
  }, 0);

  const effectiveDeliveryFee =
    subtotal >= FREE_DELIVERY_LIMIT ? 0 : Number(delivery_fee);

  const total = subtotal + effectiveDeliveryFee;

  return (
    <div
      className="w-full bg-gray-50 border border-gray-200 p-6"
      style={{ borderRadius: 14 }}
    >
      <h2 className="text-lg font-semibold mb-6">Order summary</h2>

      {/* ITEMS */}
      <div className="space-y-4 mb-6">
        {Object.keys(cartItems).map((variantId) => {
          const item = cartItems[variantId];
          const product = getProduct(item.productId);
          if (!product) return null;

          return (
            <div key={variantId} className="flex items-center gap-4">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">Qty {item.count}</p>
              </div>
              <p className="text-sm">
                {currency}
                {product.price * item.count}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="mb-4" />

      {/* SUBTOTAL */}
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span>
          {currency}
          {subtotal}
        </span>
      </div>

      {/* SHIPPING */}
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-600">Shipping</span>
        <span className="text-green-600">
          {delivery_fee}
        </span>
      </div>

     

      <hr className="my-4" />

      {/* TOTAL */}
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>
          {currency}
          {total + delivery_fee}
        </span>
      </div>

      <button
      onClick={onSubmitHandler}
        disabled={!isFormValid}
        className={`w-full mt-6 py-3 rounded-lg transition
    ${
      isFormValid
        ? "bg-black text-white hover:bg-gray-900"
        : "bg-gray-400 text-white cursor-not-allowed"
    }`}
      >
        Pay now
      </button>
    </div>
  );
};

export default OrderSummary;
