const getContainers = async () => {
    const response = await fetch('/api/menu/containers')
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const getFlavors = async () => {
    const response = await fetch('/api/menu/flavors')
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

const getToppings = async () => {
    const response = await fetch('/api/menu/toppings')
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default { getContainers, getFlavors, getToppings }
