import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Ice Cream</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Create Order</a></li>
                <li><a href='/orders' role='button'>View Orders</a></li>
            </ul>

        </nav>
    )
}

export default Navigation