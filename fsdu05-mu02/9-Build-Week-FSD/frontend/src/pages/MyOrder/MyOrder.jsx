// import React, { useEffect, useState } from "react";
// import "./MyOrder.css";
// import Footer from "../../components/common/Footer";
// import { GetMyOrders } from "../../Apicalls/order";

// const steps = ["Ordered", "Packed", "Shipped", "Out for Delivery", "Delivered"];

// const MyOrder = () => {
//   const [activeTab, setActiveTab] = useState("current");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orders, setOrders] = useState([]);

//   const fetchGetMyOrders = async () => {
//     try {
//       const response = await GetMyOrders();
//       if (response) {
//         setOrders(response);
//         console.log("orders-", response);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchGetMyOrders();
//   }, []);

//   const getStepIndex = (status) => steps.indexOf(status);

//   const currentOrders = orders.filter(
//     (order) => order.shippingStatus !== "Delivered"
//   );
//   const completedOrders = orders.filter(
//     (order) => order.shippingStatus === "Delivered"
//   );

//   const displayedOrders =
//     activeTab === "current" ? currentOrders : completedOrders;

//   return (
//     <>
//       <div className="order-container">
//         <h2>My Orders</h2>

//         <div className="tab-buttons">
//           <button
//             className={activeTab === "current" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("current");
//               setSelectedOrder(null);
//             }}
//           >
//             Current Orders
//           </button>
//           <button
//             className={activeTab === "completed" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("completed");
//               setSelectedOrder(null);
//             }}
//           >
//             Completed Orders
//           </button>
//         </div>

//         <div className="order-list">
//           {displayedOrders.length === 0 ? (
//             <p>
//               No {activeTab === "current" ? "current" : "completed"} orders
//               found.
//             </p>
//           ) : (
//             displayedOrders.map((order) => (
//               <div
//                 className={`order-card ${
//                   selectedOrder?.id === order.id ? "active" : ""
//                 }`}
//                 key={order._id}
//                 onClick={() => setSelectedOrder(order)}
//               >
//                 <p>
//                   <strong>Order ID:</strong> {order.orderId}
//                 </p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> ₹{order.totalPrice}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {order.shippingStatus}
//                 </p>
//                 <p>
//                   <strong>Payment:</strong> {order.isPaid ? "Paid" : "Pending"}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>

//         {selectedOrder && (
//           <div className="order-details">
//             <h3>Order Details</h3>
//             <p>
//               <strong>Order ID:</strong>{" "}
//               {selectedOrder.orderId || selectedOrder._id}
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedOrder.createdAt).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Total:</strong> ₹{selectedOrder.totalPrice}
//             </p>
//             <p>
//               <strong>Shipping Status:</strong> {selectedOrder.shippingStatus}
//             </p>
//             <p>
//               <strong>Payment Status:</strong>{" "}
//               {selectedOrder.isPaid ? "Paid" : "Pending"}
//             </p>

//             {selectedOrder.isPaid && (
//               <div className="payment-box">
//                 <h4>Payment Details</h4>
//                 <p>
//                   <strong>Method:</strong> {selectedOrder.paymentMethod}
//                 </p>
//                 <p>
//                   <strong>Transaction ID:</strong>{" "}
//                   {selectedOrder.orderId}
//                 </p>
//                 <p>
//                   <strong>Amount Paid:</strong> ₹{selectedOrder.totalPrice}
//                 </p>
//                 <p>
//                   <strong>Payment Date:</strong>{" "}
//                   {new Date(selectedOrder.paidAt).toLocaleDateString()}
//                 </p>
//               </div>
//             )}

//             <h4>Products</h4>
//             <div className="product-list">
//               {selectedOrder.orderItems.map((product, index) => (
//                 <div key={index} className="product-card">
//                   <img src={product.image} alt={product.name} />
//                   <div>
//                     <p>{product.name}</p>
//                     <p>Qty: {product.qty}</p>
//                     <p>Price: ₹{product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <h4>Shipping Progress</h4>
//             <div className="status-tracker">
//               {steps.map((step, idx) => {
//                 const activeIndex = getStepIndex(selectedOrder.shippingStatus);
//                 return (
//                   <div className="status-step" key={step}>
//                     <div
//                       className={`status-dot ${
//                         idx <= activeIndex ? "active" : ""
//                       }`}
//                     ></div>
//                     <span
//                       className={`status-label ${
//                         idx <= activeIndex ? "active" : ""
//                       }`}
//                     >
//                       {step}
//                     </span>
//                     {idx < steps.length - 1 && (
//                       <div
//                         className={`status-line ${
//                           idx < activeIndex ? "active" : ""
//                         }`}
//                       ></div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyOrder;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import { GetMyOrders } from "../../Apicalls/order";

const steps = ["Ordered", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  font-family: "Segoe UI", sans-serif;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    padding: 10px 20px;
    border: none;
    background: #ddd;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s;

    &.active {
      background: #4caf50;
      color: white;
    }
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OrderCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 12px;
  width: 280px;
  cursor: pointer;
  transition: transform 0.2s ease;
  background-color: #f9f9f9;

  &:hover {
    transform: scale(1.02);
    border-color: #4caf50;
  }

  &.active {
    background-color: #e6f9ea;
    border: 2px solid #4caf50;
  }
`;

const OrderDetails = styled.div`
  margin-top: 3rem;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ProductCard = styled.div`
  display: flex;
  gap: 1rem;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    object-fit: cover;
  }
`;

const PaymentBox = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 5px solid #4caf50;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;

  p {
    margin: 0.3rem 0;
    color: #555;
    font-size: 14px;
  }
`;

const StatusTracker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
  flex-wrap: wrap;
`;

const StatusStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 60px;
`;

const StatusDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#4caf50" : "gray")};
  z-index: 2;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const StatusLabel = styled.span`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ active }) => (active ? "#4caf50" : "gray")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const StatusLine = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  right: -50%;
  height: 4px;
  background: ${({ active }) => (active ? "#4caf50" : "gray")};
  z-index: 1;

  @media (max-width: 768px) {
    height: 3px;
  }
`;

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchGetMyOrders = async () => {
    try {
      const response = await GetMyOrders();
      if (response) {
        setOrders(response);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchGetMyOrders();
  }, []);

  const getStepIndex = (status) => steps.indexOf(status);

  const currentOrders = orders.filter(
    (order) => order.shippingStatus !== "Delivered"
  );
  const completedOrders = orders.filter(
    (order) => order.shippingStatus === "Delivered"
  );

  const displayedOrders =
    activeTab === "current" ? currentOrders : completedOrders;

  return (
    <>
      <Container>
        <Heading>My Orders</Heading>

        <TabButtons>
          <button
            className={activeTab === "current" ? "active" : ""}
            onClick={() => {
              setActiveTab("current");
              setSelectedOrder(null);
            }}
          >
            Current Orders
          </button>
          <button
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => {
              setActiveTab("completed");
              setSelectedOrder(null);
            }}
          >
            Completed Orders
          </button>
        </TabButtons>

        <OrderList>
          {displayedOrders.length === 0 ? (
            <p>No {activeTab === "current" ? "current" : "completed"} orders found.</p>
          ) : (
            displayedOrders.map((order) => (
              <OrderCard
                key={order._id}
                className={selectedOrder?.id === order.id ? "active" : ""}
                onClick={() => setSelectedOrder(order)}
              >
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong> {order.shippingStatus}
                </p>
                <p>
                  <strong>Payment:</strong> {order.isPaid ? "Paid" : "Pending"}
                </p>
              </OrderCard>
            ))
          )}
        </OrderList>

        {selectedOrder && (
          <OrderDetails>
            <h3>Order Details</h3>
            <p>
              <strong>Order ID:</strong>{" "}
              {selectedOrder.orderId || selectedOrder._id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Total:</strong> ₹{selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Shipping Status:</strong> {selectedOrder.shippingStatus}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {selectedOrder.isPaid ? "Paid" : "Pending"}
            </p>

            {selectedOrder.isPaid && (
              <PaymentBox>
                <h4>Payment Details</h4>
                <p>
                  <strong>Method:</strong> {selectedOrder.paymentMethod}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {selectedOrder.orderId}
                </p>
                <p>
                  <strong>Amount Paid:</strong> ₹{selectedOrder.totalPrice}
                </p>
                <p>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(selectedOrder.paidAt).toLocaleDateString()}
                </p>
              </PaymentBox>
            )}

            <h4>Products</h4>
            <ProductList>
              {selectedOrder.orderItems.map((product, index) => (
                <ProductCard key={index}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <p>{product.name}</p>
                    <p>Qty: {product.qty}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                </ProductCard>
              ))}
            </ProductList>

            <h4>Shipping Progress</h4>
            <StatusTracker>
              {steps.map((step, idx) => {
                const activeIndex = getStepIndex(selectedOrder.shippingStatus);
                return (
                  <StatusStep key={step}>
                    <StatusDot active={idx <= activeIndex} />
                    <StatusLabel active={idx <= activeIndex}>{step}</StatusLabel>
                    {idx < steps.length - 1 && (
                      <StatusLine active={idx < activeIndex} />
                    )}
                  </StatusStep>
                );
              })}
            </StatusTracker>
          </OrderDetails>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyOrder;
