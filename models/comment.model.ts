import mongoose from "mongoose";

//Reaction ennumeration, as typescript dosnt lik regular js enums
export const reactions={
    ME_GUSTA:"ME_GUSTA",
    AMOR:"AMOR",
    EN_DESACUERDO:"EN_DESACUERDO",
    ME_ENTRISTESE:"ME_ENTRISTESE",
    ME_ENFADA:"ME_ENFADA",
    VACIO:"VACIO"
}

//Required inputs for a Reaction
export interface ReactionInput{
    reaction: string;
    author: mongoose.Types.ObjectId;
    authorName: string;
}


//how a reaction is saved
export interface ReactionDocument extends ReactionInput, mongoose.Document{
    createdAt: Date;
    deletedAt?: Date;
}

//Required inputs for a Comment
export interface CommentInput {
    text: string;
    author: string;
    authorName: string;
    parent?:mongoose.Types.ObjectId;
}
//how a comment is saved
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
    //Comments can respond to other comments, only their Id is saved
    comments: [{type:mongoose.Types.ObjectId, required: false}],
    parent: {type:mongoose.Types.ObjectId, required: false},
    //reactions are emedded into comments
    reactions: [reactionSchema]
}, { timestamps: true, collection: "comments" });

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;