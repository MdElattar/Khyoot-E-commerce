import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, products, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
        if (!token) {
            return null
        }

        const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
        if (response.data.success) {
            let allOrdersItem = []
            response.data.orders.map((order)=>{
                order.items.map((item)=>{
                    item['status'] = order.status
                    item['payment'] = order.payment
                    item['paymentMethod'] = order.paymentMethod
                    item['date'] = order.date
                    allOrdersItem.push(item)
                })
            })
            setorderData(allOrdersItem.reverse())
        }
    } catch (error) {
        // ... (rest of the error handling)
        console.log(error.message)
    }
}

useEffect(()=>{
  loadOrderData()
},[token])

  return (
    <div className="pt-16 px-4 mt-16 mb-16 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Page Title */}
      <div className="text-2xl mb-4">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* Orders List */}
      <div>
        {
        orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Product Info */}
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 sm:w-20"
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-2 text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>

                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-gray-500"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button
                style={{ borderRadius: 6 }}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
