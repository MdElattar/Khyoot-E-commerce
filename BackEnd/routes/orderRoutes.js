import express from 'express'
import { allOrders, PlaceOrder, updateStatus, userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, PlaceOrder)


// User Feature
orderRouter.post('/userorders',authUser, userOrders)

export default orderRouter