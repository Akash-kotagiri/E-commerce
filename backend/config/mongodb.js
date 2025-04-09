import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB CONNECTED");
        });

        mongoose.connection.on("error", (err) => {
            consolel.error("DB CONNECTION ERROR:", err.stack);
        });

        mongoose.connection.on("disconnected", () => {
            console.log('DB DISCONNECTED');
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

        console.log('Connection attempt completed');
    } catch (error) {
        console.error('DB CONNECTION FAILED:', error.stack);
        process.exit(1);
    }
};

export default connectDb;