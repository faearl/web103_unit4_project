export const calcTotal = (selections) => {
    return ['Container', 'Flavor', 'Topping 1', 'Topping 2'].reduce((sum, tab) => {
        const item = selections[tab]
        if (!item || item.id === null) return sum
        return sum + parseFloat(item.price || 0)
    }, 0)
}
