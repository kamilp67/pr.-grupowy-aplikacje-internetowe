import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { formatCurrency } from "../utilities/formatCurrency";

type OrderItemType = {
    id: number;
    orderId: number;
    bookId: number;
    quantity: number;
};

type OrderType = {
    id: number;
    userId: number;
    address: string;
    price: number;
    status: string;
    orderItems: OrderItemType[];
};

export function Orders() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<OrderType | null>(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error("There was an error fetching the orders!", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSaveOrder = async (order: OrderType) => {
        try {
            if (editingOrder) {
                await axios.put(`/api/orders/${order.id}`, order);
                setOrders((prevOrders) =>
                    prevOrders.map((o) => (o.id === order.id ? order : o))
                );
            } else {
                const response = await axios.post('/api/orders', order);
                setOrders((prevOrders) => [...prevOrders, response.data]);
            }
            setShowModal(false);
            setEditingOrder(null);
        } catch (error) {
            console.error("There was an error saving the order!", error);
        }
    };

    const handleEditOrder = (order: OrderType) => {
        setEditingOrder(order);
        setShowModal(true);
    };

    const handleDeleteOrder = async (id: number) => {
        try {
            await axios.delete(`/api/orders/${id}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (error) {
            console.error("There was an error deleting the order!", error);
        }
    };

    return (
        <>
            <h1>Orders Management</h1>
            {Array.isArray(orders) && orders.length === 0 ? (
                <p>No orders available</p>
            ) : (
                <Table striped bordered hover className="mt-4">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Order Items</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(orders) && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.address}</td>
                            <td>{formatCurrency(order.price)}</td>
                            <td>{order.status}</td>
                            <td>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.id}>
                                            Book ID: {item.bookId}, Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEditOrder(order)}
                                >
                                    Edit
                                </Button>{" "}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
            <OrderModal
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setEditingOrder(null);
                }}
                handleSave={handleSaveOrder}
                editingOrder={editingOrder}
            />
        </>
    );
}

type OrderModalProps = {
    show: boolean;
    handleClose: () => void;
    handleSave: (order: OrderType) => void;
    editingOrder: OrderType | null;
};

function OrderModal({
                        show,
                        handleClose,
                        handleSave,
                        editingOrder,
                    }: OrderModalProps) {
    const [userId, setUserId] = useState(editingOrder?.userId || 0);
    const [address, setAddress] = useState(editingOrder?.address || "");
    const [price, setPrice] = useState(editingOrder?.price || 0);
    const [status, setStatus] = useState(editingOrder?.status || "");
    const [orderItems, setOrderItems] = useState<OrderItemType[]>(editingOrder?.orderItems || []);

    useEffect(() => {
        if (editingOrder) {
            setUserId(editingOrder.userId);
            setAddress(editingOrder.address);
            setPrice(editingOrder.price);
            setStatus(editingOrder.status);
            setOrderItems(editingOrder.orderItems);
        } else {
            setUserId(0);
            setAddress("");
            setPrice(0);
            setStatus("");
            setOrderItems([]);
        }
    }, [editingOrder]);

    const handleSubmit = () => {
        const newOrder = {
            id: editingOrder?.id || 0,
            userId,
            address,
            price,
            status,
            orderItems,
        };
        handleSave(newOrder);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editingOrder ? "Edit Order" : "Add New Order"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formOrderUserId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formOrderAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formOrderPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formOrderStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formOrderItems">
                        <Form.Label>Order Items</Form.Label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.bookId}
                                            onChange={(e) => {
                                                const updatedItems = [...orderItems];
                                                updatedItems[index].bookId = Number(e.target.value);
                                                setOrderItems(updatedItems);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const updatedItems = [...orderItems];
                                                updatedItems[index].quantity = Number(e.target.value);
                                                setOrderItems(updatedItems);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setOrderItems([...orderItems, { id: 0, orderId: 0, bookId: 0, quantity: 1 }]);
                            }}
                        >
                            Add Item
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
