import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import OrderSummary from "./OrderSummary";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartCount,
    delivery_fee,
    products,
    getCartAmount,
  } = useContext(ShopContext);

  const [step, setStep] = useState(
    () => Number(localStorage.getItem("checkoutStep")) || 1
  );

  const [hasInteracted, setHasInteracted] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (targetStep) => {
    if (targetStep > step) {
      const isValid = validateForm();
      if (!isValid) return;
    }

    setStep(targetStep);
    localStorage.setItem("checkoutStep", targetStep);
  };

  const scrollToFirstError = () => {
    const firstError = document.querySelector("[data-error='true']");
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleChange = (e) => {
    setHasInteracted(true);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

        for (const itemKey in cartItems) {
      // itemKey format: productId_size_color
      const [productId, size, color] = itemKey.split("_");

      const quantity = cartItems[itemKey].count;

      if (quantity > 0) {
        const itemInfo = products.find(
          (product) => product._id === productId
        );

        if (!itemInfo) continue;

        orderItems.push({
          productId: itemInfo._id,
          name: itemInfo.name,
          description: itemInfo.description,
          price: itemInfo.price,
          image: itemInfo.image,
          category: itemInfo.category,
          subCategory: itemInfo.subCategory,
          sizes: itemInfo.sizes,
          colors: itemInfo.colors,
          bestseller:itemInfo.bestseller,
          status: itemInfo.status,
          size: size,        // ✅ correct size
          color: color,      // ✅ correct color
          quantity: quantity,
          date: Date.now(),
        });
      }
    }
      

      if (orderItems.length === 0) {
        alert("Your cart is empty or products could not be found.");
        return;
      }
      // Create the final order data object
      const orderData = {
        address: formData,
        items: orderItems,
        // Ensure getCartAmount is available in this scope
        amount: getCartAmount() + delivery_fee,
        paymentMethod: "cod"
      };

      switch (paymentMethod) {
        case "cod":
          // Inside onSubmitHandler for case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } } // Passes the token correctly to the updated middleware
          );

          if (response.data.success) {
            setCartItems({}); // Clears UI state immediately
            navigate("/orders");
            toast.success("ORDER PLACED ")
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }

      // Proceed with your order placement API call here...
    } catch (error) {
      console.error("Order Submission Error:", error);
    }
  };

  //   const onSubmitHandler = async (event) => {
  //     event.preventDefault();
  //     try {
  //       let orderItems = [];
  //       for (const itemKey in cartItems) {
  //         const productId = itemKey.split("_")[0];
  //         for (const size in cartItems[itemKey]) {
  //           if (cartItems[itemKey][size] > 0) {
  //             const itemInfo = products.find(
  //               (product) => product._id === productId
  //             );
  //             if (itemInfo) {
  //               const itemCopy = structuredClone(itemInfo);
  //               itemCopy.size = size;
  //               itemCopy.quantity = cartItems[itemKey][size];
  //               orderItems.push(itemCopy);
  //             }
  //           }
  //         }
  //       }

  //       if (orderItems.length === 0) return alert("Cart is empty");

  //       let orderData = {
  //     address: formData,
  //     items: orderItems,
  //     amount: getCartAmount() + delivery_fee // Now this will work correctly!
  // };

  //       switch (paymentMethod) {
  //         case "cod":
  //           const response = await axios.post(
  //             backendUrl + "/api/order/place",
  //             orderData,
  //             { headers: { token: token } } // Third argument, lowercase 'token'
  //           );

  //           if (response.data.success) {
  //             setCartItems({});
  //             navigate("/orders");
  //           } else {
  //             toast.error(response.data.message);
  //           }
  //           break;
  //         // ... other cases
  //       }
  //     } catch (error) {
  //       console.error("Order Error:", error);
  //     }
  //   };

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let orderItems = [];

  //     for (const items in cartItems) {
  //       const productId = items.split("_")[0]; // Fix for composite keys
  //       for (const item in cartItems[items]) {
  //         if (cartItems[items][item] > 0) {
  //           const itemInfo = products.find(
  //             (product) => product._id === productId
  //           );
  //           if (itemInfo) {
  //             const itemCopy = structuredClone(itemInfo);
  //             itemCopy.size = item;
  //             itemCopy.quantity = cartItems[items][item];
  //             orderItems.push(itemCopy);
  //           }
  //         }
  //       }
  //     }

  //     if (orderItems.length === 0) return alert("Cart is empty");

  //     let orderData = {
  //       address: formData,
  //       items: orderItems,
  //       amount: getCartAmount() + delivery_fee, // Uses the new function
  //     };

  //     switch (paymentMethod) {
  //       case "cod":
  //         // Use a local total if getCartAmount isn't in your context yet
  //         const totalAmount =
  //           typeof getCartAmount === "function"
  //             ? getCartAmount() + delivery_fee
  //             : 0; // Replace 0 with your manual calculation if needed

  //         const response = await axios.post(
  //           backendUrl + "/api/order/place",
  //           { ...orderData, amount: totalAmount },
  //           {
  //             headers: {
  //               token: token, // This sends the key as 'token' (lowercase)
  //             },
  //           }
  //         );

  //         if (response.data.success) {
  //           setCartItems({});
  //           navigate("/orders");
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //         break;
  //       // Add other payment methods here
  //     }
  //   } catch (error) {
  //     console.error("Submit Error:", error);
  //     toast.error(error.message);
  //   }
  // };
  useEffect(() => {
    localStorage.setItem("checkoutStep", step);
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [step, formData]);

  useEffect(() => {
    const savedStep = localStorage.getItem("checkoutStep");
    const savedData = localStorage.getItem("checkoutData");

    if (savedStep) setStep(Number(savedStep));
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    const valid = Object.values(formData).every((v) => v.trim());
    setIsFormValid(valid);
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("checkoutStep", step);
  }, [step]);

  return (
    <div className="px-2 mt-12 sm:px-6 md:px-10 lg:px-16 py-10  mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE – FORM */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 sm:p-8">
          {/* CONTACT */}
          <div
            className={`section ${
              step >= 1 ? "open" : ""
            } mb-8 text-2xl font-bold mt-6`}
          >
            <Title text1="CONTACT" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              onClick={() => goToStep(1)}
              data-error={errors.email ? "true" : "false"}
              className={`input ${
                errors.email
                  ? "border-red-500 ring-1 ring-red-500 shake input-error"
                  : ""
              }`}
            />
          </div>

          {/* DELIVERY */}
          <div className={`section ${step >= 2 ? "open" : "collapsed"} mb-8`}>
            <div className="mb-3  text-2xl font-bold">
              <Title text1="DELIVERY" />
            </div>

            <div className="space-y-4 font-bold">
              <input
                onClick={() => goToStep(2)}
                type="text"
                placeholder="Country"
                name="country"
                className={`input ${
                  errors.country
                    ? "border-red-500 ring-1 ring-red-500 shake input-error"
                    : ""
                }`}
                value={formData.country}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  onClick={() => goToStep(2)}
                  type="text"
                  required
                  placeholder="First name"
                  name="firstName"
                  className={`input ${
                    errors.firstName
                      ? "border-red-500 ring-1 ring-red-500 shake input-error"
                      : ""
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  onClick={() => goToStep(2)}
                  type="text"
                  required
                  placeholder="Last name"
                  name="lastName"
                  className={`input ${
                    errors.lastName
                      ? "border-red-500 ring-1 ring-red-500 shake input-error"
                      : ""
                  }`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <input
                onClick={() => goToStep(2)}
                type="text"
                placeholder="Address"
                name="address"
                className={`input ${
                  errors.address && "border-red-500 ring-1 ring-red-500 input"
                }`}
                value={formData.address}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  onClick={() => goToStep(2)}
                  type="text"
                  placeholder="City "
                  name="city"
                  className={`input ${
                    errors.city
                      ? "border-red-500 ring-1 ring-red-500 shake input-error"
                      : ""
                  }`}
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  onClick={() => goToStep(2)}
                  type="text"
                  placeholder="State"
                  name="state"
                  className={`input ${
                    errors.state
                      ? "border-red-500 ring-1 ring-red-500 shake input-error"
                      : ""
                  }`}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  onClick={() => goToStep(2)}
                  type="text"
                  placeholder="ZIP Code"
                  name="zip"
                  className={`input ${
                    errors.zip
                      ? "border-red-500 ring-1 ring-red-500 shake input-error"
                      : ""
                  }`}
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                onClick={() => goToStep(2)}
                type="tel"
                placeholder="Phone"
                name="phone"
                className={`input ${
                  errors.phone
                    ? "border-red-500 ring-1 ring-red-500 shake input-error"
                    : ""
                }`}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className={`section ${step >= 3 ? "open" : "collapsed"} mb-12`}>
            <h2 className="text-2xl font-bold mb-2">PAYMENT</h2>
            <p className="text-sm text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>

            <div className="border rounded-lg overflow-hidden">
              {/* CARD PAYMENT */}
              <label
                className={`block border-b cursor-pointer  border  overflow-hidden
    ${
      paymentMethod === "card"
        ? "bg-blue-50 border-blue-500"
        : "bg-gray-300 border-gray-300 hover:bg-gray-300"
    }
  `}
              >
                <div className="flex items-center gap-4 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    onClick={() => goToStep(3)}
                    disabled
                  />
                  <span className="font-medium">
                    Pay via (Debit/Credit cards / Wallets / Installments)
                  </span>
                  <img
                    className="ml-auto h-10 w-10"
                    src="src/assets/frontend_assets/visa.png"
                    alt="visa Icons"
                    />
                  <img
                    className=" h-10 w-10"
                    src="src/assets/frontend_assets/shopping.png"
                    alt="visa Icons"
                    />
                    <p>Not available</p>
                </div>

                {/* SLIDE CONTENT */}
                <div
                  className={`payment-slide ${
                    paymentMethod === "card" ? "open" : "closed"
                  }`}
                >
                  <div className="p-6  bg-gray-200">
                    <div className="mx-auto mb-4 w-14 h-10 border rounded flex items-center justify-center">
                      →
                    </div>
                    <p className="text-center text-gray-600">
                      After clicking <b>“Pay now”</b>, you will be redirected to
                      complete your purchase securely.
                    </p>
                  </div>
                </div>
              </label>
              {/* flex items-center gap-4 p-4 border-b cursor-pointer  border  overflow-hidden */}

              {/* CASH ON DELIVERY */}
              <label
                className={`  flex items-center gap-4 p-4 border-b cursor-pointer  border  overflow-hidden
    ${
      paymentMethod === "cod"
        ? "bg-blue-50 border-blue-500"
        : "bg-white border-gray-300 hover:bg-gray-50"
    }
  `}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  onClick={() => goToStep(3)}
                />
                <span>Cash on Delivery (COD)</span>
              </label>

              {/* INSTAPAY */}
              <label
                className={`  block border  overflow-hidden cursor-pointer transition-all
    ${
      paymentMethod === "instapay"
        ? "bg-blue-50 border-blue-500"
        : "bg-gray-300 border-gray-300 hover:bg-gray-300"
    }
  `}
              >
                <div className="flex items-center gap-4 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "instapay"}
                    onChange={() => setPaymentMethod("instapay")}
                    onClick={() => goToStep(3)}
                    disabled
                  />
                  <span className="font-medium">INSTAPAY</span>
                  <p className="ml-auto">Not available</p>
                </div>

                <div
                  className={`payment-slide ${
                    paymentMethod === "instapay" ? "open" : "closed"
                  }`}
                >
                  <div className="p-4 text-gray-600 bg-gray-300">
                    Please read the payment instructions once you complete the
                    order
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 h-fit sticky top-24">
            <OrderSummary
              isFormValid={isFormValid}
              hasInteracted={hasInteracted}
              onSubmitHandler={onSubmitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
