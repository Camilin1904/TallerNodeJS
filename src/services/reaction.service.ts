import mongoose from "mongoose";
import Comment, { CommentDocument, ReactionDocument, ReactionInput } from "../models/comment.model";
import CommentModel from "../models/user.model"
import { NotAuthorizedError } from "../exceptions";


export class ReactionService {

    async create(commentId:string, reactionText: ReactionInput): Promise<ReactionDocument | null> {
        const comment = await Comment.findById(commentId);
        //If there is no comment, thre cannot be a reaction.
        if (!comment) throw new Error('Comment not found');
        
        //This step is necesary as an object of type reaction input is not
        //accepted by the push method.
        const newReaction: any = {...reactionText, updatedAt: new Date() };
        comment.reactions.push(newReaction);
        comment.save();
        return newReaction;
    }

    async findById(commentId: string, reactionId: string): Promise<ReactionDocument | null> {
        //limits the ammount of fields to use
        const comment = await Comment.findById(commentId).select('reactions');
        if (!comment) throw new Error('Comment not found');
        const reaction: ReactionDocument | null = (comment.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);
        return reaction;
  }

    async findAll(commentId: string): Promise<ReactionDocument[] | null> {
        const comment = await Comment.findById(commentId).select('reactions');
        if (!comment) throw new Error('Comment not found');
        return comment.reactions;
    }

    async update(commentId: string, reactionId: string, newText: ReactionInput, userId: string): Promise<ReactionDocument | null> {
        if(await this.isOwner(userId, reactionId)){
            const comment = await Comment.findById(commentId);
            if (!comment) throw new Error('Comment not found');

            const reaction = (comment.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);

            if (!reaction) throw new Error('Reaction not found');

            //The only thing that can be edited is the reaction, 
            //the author is no be left untouched.
            reaction.reaction = newText.reaction;
            
            comment.save();
            return reaction;
        }
    
        else throw new NotAuthorizedError("This user cannot nodify this comment")
    }

    async delete(commentId: string, reactionId: string, userId: string): Promise<ReactionDocument | null> {
        if(await this.isOwner(userId, reactionId)){
            const comment = await Comment.findById(commentId);
            
            if (!comment) throw new Error('Comment not found');

            const reaction = (comment.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);

            if (!reaction) throw new Error('Reaction not found');

            const reactionIndex = comment.reactions.findIndex(treaction => treaction._id === reaction._id)
            comment.reactions.splice(reactionIndex, 1)
            comment.save();

            return reaction;
        }
    
        else throw new NotAuthorizedError("This user cannot nodify this comment")
    }

    async isOwner(authId: string, commentId: string): Promise<boolean>{
        const comment = await Comment.findById(commentId);
        return authId==comment?.author
    }

}

export default new ReactionService();