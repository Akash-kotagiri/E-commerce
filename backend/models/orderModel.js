import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [{
    productId: String,
    quantity: Number,
    price: Number,
    title: String,
  }],
  total: { type: Number, required: true },
  address: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
  },
  paymentMethod: { type: String, enum: ['cash', 'stripe'], required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);