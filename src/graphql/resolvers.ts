import User from '../models/user.model';
import Comment, { ReactionDocument, reactions } from '../models/comment.model';
import userService from '../services/user.service';
import commentService from '../services/comment.service';
import reactionService from '../services/reaction.service';
import { Query } from 'mongoose';
import { UserExistError } from '../exceptions';
import auth from '../middlewares/auth';

const resolvers = {
    Query: {
        login: async (root: any, args: any) => {
            const { email, password } = args;
            return await userService.login({name: "", email, password});
        },
        users: async (root: any, args: any, context: any) => {
            console.log(context)
            return await userService.findAll();
        },
        user: async (root: any, args: any) => {
            const { id } = args;
            return await userService.findById(id);
        },
        comments: async (root: any, args: any) => {
            return await commentService.findAll();
        },
        comment: async (root: any, args: any) => {
            const { id } = args;
            return await commentService.findById(id);
        },
        reactions: async (root: any, args: any) => {
            const { commentId } = args;
            return await reactionService.findAll(commentId);
        },
        reaction: async (root: any, args: any) => {
            const { commentId, id } = args;
            return await reactionService.findById(commentId, id);
        },
    },
    Mutation: {
        createUser: async (root: any, args: any) => {
            const { name, email, password } = args;

            try{
                return await userService.create({ name, email, password });
            }
            catch (error){
                if (error instanceof UserExistError){
                    throw new Error("User already exists")
                }
                throw new Error("Internal server error")
            }   
        },
        createComment: async (root: any, args: any, context: any) => {
            const { text, parent } = args;
            const { user } = context;
            console.log(context)
            return await commentService.create({ text, parent, authorName:user.name, author: user.user_id }, user.user_id);
        },
        createReaction: async (root: any, args: any, context: any) => {
            const { commentId, reaction } = args;
            const { user } = context;

            var re = reactions.VACIO;
            switch(reaction){
                case 1:
                    re = reactions.ME_GUSTA;
                    break;
                case 2:
                    re = reactions.AMOR;
                    break;
                case 3:
                    re = reactions.EN_DESACUERDO;
                    break;
                case 4:
                    re = reactions.ME_ENTRISTESE;
                    break;
                case 5:
                    re = reactions.ME_ENFADA;
                    break;
            }
            return await reactionService.create(commentId, { reaction: re, author: user.user_id, authorName: user.name });
        },
    },
};

export default resolvers;