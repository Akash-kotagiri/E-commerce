import express from 'express';
import { addToCart, removeFromCart, getCartData, updateCartQuantity, clearCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.use(authMiddleware);

cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart);
cartRouter.post('/update', updateCartQuantity);
cartRouter.get('/', getCartData);
cartRouter.post('/clear', clearCart);

export default cartRouter;