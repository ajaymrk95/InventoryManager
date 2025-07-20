    import React, { useEffect, useState } from "react";
    import axios from "axios";

    const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        const response = await axios.get("http://localhost:5000/api/orders/userorders", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            setOrders(response.data.userOrders);
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

    return (
        <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {loading ? (
            <p className="text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id} className="border-t">
                    <td className="py-3 px-4">{order.productID?.name     || "Unknown"}</td>
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
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
    };

    export default UserOrders;
