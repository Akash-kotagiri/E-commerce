import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

export const createOrder = async (req, res) => {
  const { items, total, address, paymentMethod } = req.body;
  const userId = req.userId;
  try {
    const order = new orderModel({
      userId,
      items,
      total,
      address,
      paymentMethod,
    });
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('getOrders error:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};