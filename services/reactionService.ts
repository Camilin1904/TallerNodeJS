import mongoose from "mongoose";
import User, { UserDocument, Reaction, ReactionInput } from "../models/user.model";
import UserModel from "../models/user.model"


export class ReactionService {

    async create(reactionText: ReactionInput): Promise<Reaction | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const newReaction: any = {...reactionText, updatedAt: new Date() };
        user.reactions.push(newReaction);
        user.save();
        return newReaction;
    }

    async findById(userId: string, reactionId: string): Promise<Reaction[] | null> {
      const user = await User.findById(userId).select('reactions');
      if (!user) throw new Error('User not found');
      const reaction = (user.reactions as mongoose.Types.DocumentArray<Reaction>).id(reactionId);
      return user.reactions;
  }

    async findAll(userId: string): Promise<Reaction[] | null> {
        const user = await User.findById(userId).select('reactions');
        if (!user) throw new Error('User not found');
        return user.reactions;
    }

    async update(userId: string, reactionId: string, newText: ReactionInput): Promise<Reaction | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const reaction = (user.reactions as mongoose.Types.DocumentArray<Reaction>).id(reactionId);

        if (!reaction) throw new Error('Reaction not found');


        reaction.title = newText.title;
        reaction.text = newText.text;
        reaction.updatedAt = new Date();
        
        user.save();
        return reaction;
    }

    async delete(userId: string, reactionId: string): Promise<Reaction | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        const reaction = (user.reactions as mongoose.Types.DocumentArray<Reaction>).id(reactionId);
        if (!reaction) throw new Error('Reaction not found');
        const reactionIndex = user.reactions.findIndex(treaction => treaction._id === reaction._id)
        user.reactions.splice(reactionIndex, 1)
        user.save();

        return reaction;
    }

}

export default new ReactionService();