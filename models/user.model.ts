import mongoose from "mongoose";

//Required inputs for a User
export interface UserInput {
    name: string;
    email: string;
    password: string;
}

//how a user is saved
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
    //Every user saves a registry of all th comments they have made, only the Id is saved
    comments: [{type: mongoose.Types.ObjectId, required:true}]  
}, { timestamps: true, collection: "users" });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;