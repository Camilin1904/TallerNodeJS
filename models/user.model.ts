import mongoose from "mongoose";

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    role: string;
    comments: mongoose.Types.ObjectId[];
}


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    comments: [{type: mongoose.Types.ObjectId, required:true}]  // Embedding the comments
}, { timestamps: true, collection: "users" });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;