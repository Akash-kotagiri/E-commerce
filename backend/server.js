import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
})
);

//API endpoints 
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);



//Test endpoint
app.get('/', (req,res) => {
    res.send('API working...');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => console.log(`Server started on Port: ${port}`));
    } catch (error) {
        console.error('Failed to start sever:', error);
        process.exit(1);
    }
};
startServer();