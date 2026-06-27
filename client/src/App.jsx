import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewOrders from './pages/ViewOrders'
import EditOrder from './pages/EditOrder'
import CreateOrder from './pages/CreateOrder'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateOrder title='Customize Ice Cream' />
    },
    {
      path: '/orders',
      element: <ViewOrders title='View Orders' />
    },
    {
      path: '/edit/:id',
      element: <EditOrder title='Edit Order' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      {element}

    </div>
  )
}

export default App