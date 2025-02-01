import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

export async function start_mongo(): Promise<typeof mongoose> {
    console.log('Starting MongoDB with Mongoose...');
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully!');
        return mongoose;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Instead of process.exit, we throw the error
        throw error;
    }
}

export default mongoose;
