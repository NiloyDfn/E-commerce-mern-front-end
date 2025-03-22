import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOrderDetailsQuery } from "../redux/api/orderApi"; // Custom query hook to fetch order details
import { Skeleton } from "../Components/Loader";
import { CustomeError } from "../types/api-types";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Extract order ID from URL
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useOrderDetailsQuery(orderId!);

  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (isError) {
      toast.error((error as CustomeError)?.data?.message || "Error loading order details");
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setOrderDetails(data.order);
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton length={1} />;
  }

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <div>
        <h2>Order ID: {orderDetails._id}</h2>
        <p>Status: {orderDetails.status}</p>
        <p>Total Amount: ${orderDetails.total}</p>
        <p>Discount: ${orderDetails.discount}</p>
        <h3>Items:</h3>
        <ul>
          {orderDetails.orderItems.map((item: any, index: number) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/orders")}>Back to Orders</button>
    </div>
  );
};

export default OrderDetails;
