import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAccount extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

const userAccountSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// The third parameter specifies the collection name in your database ('user_accounts')
const UserAccount = mongoose.model<IUserAccount>('UserAccount', userAccountSchema, 'user_accounts');

export default UserAccount; // Ensure you're exporting the model as default