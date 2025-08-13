import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const response = await axios.get("http://localhost:5000/api/orders/allorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusLabel = (status) => {
    if (status === null) return "Pending";
    return status ? "Approved" : "Rejected";
  };

  const handleApprove = async (orderId) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const response = await axios.post(
        `http://localhost:5000/api/orders/updatestatus/${orderId}`,
        { status: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Order approved successfully");
        fetchOrders(); // Refresh orders
      } else {
        alert(response.data.message || "Failed to approve order");
      }
    } catch (error) {
      console.error("Approval error:", error);
      alert("Something went wrong while approving");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const response = await axios.post(
        `http://localhost:5000/api/orders/updatestatus/${orderId}`,
        { status: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Order rejected successfully");
        fetchOrders(); // Refresh orders
      } else {
        alert(response.data.message || "Failed to reject order");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Something went wrong while rejecting");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-3 px-4">{order.userID?.username || "Unknown"}</td>
                  <td className="py-3 px-4">{order.productID?.name || "Unknown"}</td>
                  <td className="py-3 px-4">₹{order.orderprice}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        order.status === null
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {order.status === null && (
                      <>
                        <button
                          onClick={() => handleApprove(order._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status !== null && (
                      <span className="text-sm text-gray-500">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
