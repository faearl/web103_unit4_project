import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrdersAPI from '../services/OrdersAPI.jsx'
import '../css/ViewOrders.css'

const toImgUrl = (path) => '/' + path.replace('client/public/', '')

const ViewOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        OrdersAPI.getAllOrders().then(setOrders).catch(console.error)
    }, [])

    const handleDelete = async (id) => {
        try {
            await OrdersAPI.deleteOrder(id)
            setOrders(prev => prev.filter(o => o.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="view-orders-page">
            <h2>All Orders</h2>
            {orders.length === 0 ? (
                <p className="no-orders">No orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <span className="order-name">Order {order.id}</span>
                            <div className="order-images">
                                <img src={toImgUrl(order.container_image)} alt="container" />
                                <img src={toImgUrl(order.flavor_image)} alt="flavor" />
                                {order.topping1_image && (
                                    <img src={toImgUrl(order.topping1_image)} alt="topping 1" />
                                )}
                                {order.topping2_image && (
                                    <img src={toImgUrl(order.topping2_image)} alt="topping 2" />
                                )}
                            </div>
                            <div className="order-footer">
                                <span className="order-price">${parseFloat(order.total_price).toFixed(2)}</span>
                                <div className="order-actions">
                                    <button onClick={() => navigate(`/edit/${order.id}`)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewOrders
