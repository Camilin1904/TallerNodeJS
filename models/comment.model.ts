import mongoose from "mongoose";


export const reactions={
    ME_GUSTA:"ME_GUSTA",
    AMOR:"AMOR",
    EN_DESACUERDO:"EN_DESACUERDO",
    ME_ENTRISTESE:"ME_ENTRISTESE",
    ME_ENFADA:"ME_ENFADA",
    VACIO:"VACIO"
}


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
    comments: mongoose.Types.ObjectId[];
    reactions: ReactionDocument[];
}

const reactionSchema = new mongoose.Schema({
    reaction: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
})


const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {type:mongoose.Types.ObjectId, required: true},
    authorName: { type: String, required: true },
    comments: [{type:mongoose.Types.ObjectId, required: false}],
    parent: {type:mongoose.Types.ObjectId, required: false},
    reactions: [reactionSchema]
}, { timestamps: true, collection: "comments" });

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;