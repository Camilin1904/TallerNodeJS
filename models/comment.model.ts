import mongoose from "mongoose";



export interface ReactionInput{
    reaction: string;
    author: mongoose.Types.ObjectId;
    authorName: string;
}

export interface ReactionDocument extends ReactionInput, mongoose.Document{
    createdAt: Date;
    deletedAt?: Date;
}

export interface CommentInput {
    text: string;
    author: string;
    authorName: string;
    parent?:mongoose.Types.ObjectId;
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    comments: this[];
    reactions: ReactionDocument[];
}

const reactionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
})


const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {type:mongoose.Types.ObjectId, required: true},
    authorName: { type: String, required: true },
    comments: [this],
    reactions: [reactionSchema]
}, { timestamps: true, collection: "comments" });

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;