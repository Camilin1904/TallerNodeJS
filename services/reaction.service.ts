import mongoose from "mongoose";
import Comment, { CommentDocument, ReactionDocument, ReactionInput } from "../models/comment.model";
import CommentModel from "../models/user.model"


export class ReactionService {

    async create(commentId:string, reactionText: ReactionInput): Promise<ReactionDocument | null> {
        const user = await Comment.findById(commentId);
        if (!user) throw new Error('Comment not found');

        const newReaction: any = {...reactionText, updatedAt: new Date() };
        user.reactions.push(newReaction);
        user.save();
        return newReaction;
    }

    async findById(commentId: string, reactionId: string): Promise<ReactionDocument[] | null> {
      const user = await Comment.findById(commentId).select('reactions');
      if (!user) throw new Error('Comment not found');
      const reaction = (user.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);
      return user.reactions;
  }

    async findAll(commentId: string): Promise<ReactionDocument[] | null> {
        const user = await Comment.findById(commentId).select('reactions');
        if (!user) throw new Error('Comment not found');
        return user.reactions;
    }

    async update(commentId: string, reactionId: string, newText: ReactionInput): Promise<ReactionDocument | null> {
        const user = await Comment.findById(commentId);
        if (!user) throw new Error('Comment not found');

        const reaction = (user.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);

        if (!reaction) throw new Error('Reaction not found');


        reaction.reaction = newText.reaction;
        
        user.save();
        return reaction;
    }

    async delete(commentId: string, reactionId: string): Promise<ReactionDocument | null> {
        const user = await Comment.findById(commentId);
        if (!user) throw new Error('Comment not found');
        const reaction = (user.reactions as mongoose.Types.DocumentArray<ReactionDocument>).id(reactionId);
        if (!reaction) throw new Error('Reaction not found');
        const reactionIndex = user.reactions.findIndex(treaction => treaction._id === reaction._id)
        user.reactions.splice(reactionIndex, 1)
        user.save();

        return reaction;
    }

    async isOwner(authId: string, commentId: string): Promise<boolean>{
        const comment = await Comment.findById(commentId);
        return authId==comment?.author
    }

}

export default new ReactionService();