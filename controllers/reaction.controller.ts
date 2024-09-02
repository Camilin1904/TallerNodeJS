import express, {Request, Response} from "express";
import { ReactionDocument,ReactionInput } from "../models/comment.model";
import reactionService from "../services/reaction.service";
import {UserExistError, NotAuthorizedError} from "../exceptions";
import { reactions } from "../models/comment.model";
import mongoose from "mongoose";


class ReactionController {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    public async create(req:Request, res:Response){
        try{
            var re = reactions.VACIO;
            switch(req.body.reaction){
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
            console.log(re);
            const reactionInput: ReactionInput = {"reaction":re, "author": new mongoose.Types.ObjectId(req.params.authId), "authorName":req.params.name}

            const reaction: ReactionDocument | null = await reactionService.create(req.params.commentId, reactionInput);
            res.status(201).json(reaction)
        }
        catch (error){
            console.log(error)
            if (error instanceof UserExistError){
                res.status(400).json("User already exists")

            }
            res.status(500).json(error)
        }
        
    }

    public async getReaction(req: Request, res:Response){
        try{
            const reaction: ReactionDocument | null = await reactionService.findById(req.params.commentId,req.params.id);
            res.status(200).json(reaction)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    }

    public async getAll(req: Request, res:Response){
        try{
            const reactions: ReactionDocument[] | null = await reactionService.findAll(req.params.commentId);
            res.json(reactions)
        }
        catch (error){
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res:Response){
        try{
            var re = reactions.VACIO;
            switch(req.body.reaction){
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
            const reactionInput: ReactionInput = {"reaction":re, "author":new mongoose.Types.ObjectId(req.params.id), "authorName":req.params.name};
            const reaction: ReactionDocument | null = await reactionService.update(req.params.commentId, req.params.id, reactionInput, req.params.authId);
            res.status(200).json(reaction)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }

    public async delete(req: Request, res:Response){
        try{
            const reaction: ReactionDocument | null = await reactionService.delete(req.params.commentId, req.params.id, req.params.authId);
            res.status(200).json(reaction)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }
}

export default new ReactionController();