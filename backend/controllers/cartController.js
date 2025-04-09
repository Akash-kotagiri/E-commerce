import userModel from '../models/userModel.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized - No user ID' });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!user.cartData) {
      user.cartData = new Map();
    }
    const productIdStr = String(productId);
    const currentQty = user.cartData.get(productIdStr) || 0;
    user.cartData.set(productIdStr, currentQty + (quantity || 1));
    
    await user.save({ validateBeforeSave: false }).catch(err => {
      console.error(`addToCart - Save failed for User ${userId}:`, err.stack);
      throw new Error(`Save failed: ${err.message}`);
    });
    
    const updatedUser = await userModel.findById(userId);
    const cartData = updatedUser.cartData ? Object.fromEntries(updatedUser.cartData) : {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error('addToCart error:', error.stack);
    res.status(500).json({ success: false, message: 'Error updating cart', error: error.message });
  }
};

export const getCartData = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const cartData = user.cartData ? Object.fromEntries(user.cartData) : {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error('getCartData error:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching cart data' });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.cartData && user.cartData.has(String(productId))) {
      user.cartData.delete(String(productId));
    }
    await user.save();
    const updatedUser = await userModel.findById(userId);
    const cartData = updatedUser.cartData ? Object.fromEntries(updatedUser.cartData) : {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error('removeFromCart error:', error);
    res.status(500).json({ success: false, message: 'Error removing product from cart' });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.cartData) user.cartData = new Map();
    const productIdStr = String(productId);
    if (quantity <= 0) {
      user.cartData.delete(productIdStr);
    } else {
      user.cartData.set(productIdStr, quantity);
    }
    await user.save();
    const updatedUser = await userModel.findById(userId);
    const cartData = updatedUser.cartData ? Object.fromEntries(updatedUser.cartData) : {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error('updateCartQuantity error:', error);
    res.status(500).json({ success: false, message: 'Error updating cart quantity' });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.cartData = new Map();
    await user.save();
    res.json({ success: true, cartData: {} });
  } catch (error) {
    console.error('clearCart error:', error);
    res.status(500).json({ success: false, message: 'Error clearing cart' });
  }
};