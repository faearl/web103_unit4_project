import express from 'express'
import ordersController from '../controllers/orders.js'

const router = express.Router()

router.get('/', ordersController.getAllOrders)
router.get('/:id', ordersController.getOrderById)
router.post('/', ordersController.createOrder)
router.put('/:id', ordersController.editOrder)
router.delete('/:id', ordersController.deleteOrder)

export default router