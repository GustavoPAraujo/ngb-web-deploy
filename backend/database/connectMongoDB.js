import mongoose from "mongoose";


const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connection sucessfully to cluster`);
    } catch (error) {
        console.error(`Error connecting to MongoDB Cluster: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB;
