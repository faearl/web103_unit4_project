import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuAPI from '../services/MenuAPI.jsx'
import OrdersAPI from '../services/OrdersAPI.jsx'
import { calcTotal } from '../utilites/calcprice'
import '../css/CreateOrder.css'

const TABS = ['Container', 'Flavor', 'Topping 1', 'Topping 2']
const NONE_TOPPING = { id: null, name: 'None', image: null, price: 0 }

const toImgUrl = (path) => '/' + path.replace('client/public/', '')

const isChosen = (selection, item) => {
    if (!selection) return false
    if (item.id === null && selection.id === null) return true
    return selection.id === item.id
}

const EditOrder = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [containers, setContainers] = useState([])
    const [flavors, setFlavors] = useState([])
    const [toppings, setToppings] = useState([])
    const [activeTab, setActiveTab] = useState(null)
    const [error, setError] = useState(null)
    const [selections, setSelections] = useState({
        Container: null,
        Flavor: null,
        'Topping 1': null,
        'Topping 2': null,
    })

    useEffect(() => {
        Promise.all([
            MenuAPI.getContainers(),
            MenuAPI.getFlavors(),
            MenuAPI.getToppings(),
            OrdersAPI.getOrderById(id),
        ]).then(([containers, flavors, toppings, order]) => {
            setContainers(containers)
            setFlavors(flavors)
            setToppings(toppings)
            setSelections({
                Container: { id: order.container_id, name: order.container_name, image: order.container_image, price: order.container_price },
                Flavor: { id: order.flavor_id, name: order.flavor_name, image: order.flavor_image, price: order.flavor_price },
                'Topping 1': order.topping1_id ? { id: order.topping1_id, name: order.topping1_name, image: order.topping1_image, price: order.topping1_price } : NONE_TOPPING,
                'Topping 2': order.topping2_id ? { id: order.topping2_id, name: order.topping2_name, image: order.topping2_image, price: order.topping2_price } : NONE_TOPPING,
            })
        }).catch(console.error)
    }, [id])

    const optionsFor = (tab) => {
        if (tab === 'Container') return containers
        if (tab === 'Flavor') return flavors
        return [NONE_TOPPING, ...toppings]
    }

    const handleTabClick = (tab) => {
        setActiveTab(prev => prev === tab ? null : tab)
    }

    const handleSelect = (tab, item) => {
        setSelections(prev => ({ ...prev, [tab]: item }))
        setError(null)
    }

    const handleSaveOrder = async () => {
        if (!selections.Container || !selections.Flavor) {
            setError('Please select a container and flavor before saving.')
            return
        }
        try {
            await OrdersAPI.editOrder(id, {
                container_id: selections.Container.id,
                flavor_id: selections.Flavor.id,
                topping1_id: selections['Topping 1']?.id ?? null,
                topping2_id: selections['Topping 2']?.id ?? null,
                total_price: calcTotal(selections).toFixed(2),
            })
            navigate('/orders')
        } catch (err) {
            setError('Failed to save order. Please try again.')
        }
    }

    const summaryPrice = (tab) => {
        const sel = selections[tab]
        if (!sel) return '—'
        if (sel.id === null) return 'None'
        return `$${parseFloat(sel.price).toFixed(2)}`
    }

    return (
        <div className="create-order-page">
            <div className="create-order-main">
                <h2>Edit Order {id}</h2>

                <div className="selection-squares">
                    {TABS.map(tab => (
                        <div key={tab} className="selection-square" onClick={() => handleTabClick(tab)}>
                            {selections[tab] ? (
                                <>
                                    {selections[tab].image
                                        ? <img src={toImgUrl(selections[tab].image)} alt={selections[tab].name} />
                                        : <div className="none-square-icon">∅</div>
                                    }
                                    <span>{selections[tab].name}</span>
                                </>
                            ) : (
                                <span className="square-placeholder">{tab}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            className={`tab-btn ${activeTab === tab ? 'active' : ''} ${selections[tab] ? 'filled' : ''}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab && (
                    <div className="options-panel">
                        <div className="options-grid">
                            {optionsFor(activeTab).map((item, idx) => (
                                <div
                                    key={item.id ?? `none-${idx}`}
                                    className={`option-card ${isChosen(selections[activeTab], item) ? 'chosen' : ''}`}
                                    onClick={() => handleSelect(activeTab, item)}
                                >
                                    {item.image
                                        ? <img src={toImgUrl(item.image)} alt={item.name} />
                                        : <div className="none-card-icon">∅</div>
                                    }
                                    <span>{item.name}</span>
                                    {item.id !== null && (
                                        <span className="option-price">${parseFloat(item.price).toFixed(2)}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-lines">
                    {TABS.map(tab => (
                        <div key={tab} className="summary-line">
                            <span>{tab}</span>
                            <span>{summaryPrice(tab)}</span>
                        </div>
                    ))}
                </div>
                <div className="summary-total">
                    <span>Total</span>
                    <span>${calcTotal(selections).toFixed(2)}</span>
                </div>
                {error && <p className="order-error">{error}</p>}
                <button type="button" className="place-order-btn" onClick={handleSaveOrder}>
                    Save Order
                </button>
            </div>
        </div>
    )
}

export default EditOrder
