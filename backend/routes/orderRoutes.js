import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.use(authMiddleware);

orderRouter.post('/create', createOrder);
orderRouter.get('/', getOrders);

export default orderRouter;