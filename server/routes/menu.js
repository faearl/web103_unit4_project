import express from 'express'
import menuController from '../controllers/menu.js'

const router = express.Router()

router.get('/containers', menuController.getContainers)
router.get('/flavors', menuController.getFlavors)
router.get('/toppings', menuController.getToppings)

export default router