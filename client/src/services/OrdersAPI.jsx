const getAllOrders = async () => {
    const response = await fetch('/api/orders')
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const getOrderById = async (id) => {
    const response = await fetch(`/api/orders/${id}`)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const createOrder = async (order) => {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const editOrder = async (id, order) => {
    const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const deleteOrder = async (id) => {
    const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default { getAllOrders, getOrderById, createOrder, editOrder, deleteOrder }
