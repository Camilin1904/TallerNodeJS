import express, {Request, Response} from "express";
import { CommentDocument,CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";
import {UserExistError, NotAuthorizedError} from "../exceptions";


class UserController {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    public async create(req:Request, res:Response){
        try{
            
            const commentInput: CommentInput = {...req.body, "author":req.params.user_id, "authorName":req.params.user_name}

            const comment: CommentDocument | null = await commentService.create(commentInput);
            res.status(201).json(comment)
        }
        catch (error){
            if (error instanceof UserExistError){
                res.status(400).json("User already exists")

            }
            res.status(500).json(error)
        }
        
    }

    public async getComment(req: Request, res:Response){
        try{
            const comment: CommentDocument | null = await commentService.findById(req.params.id);
            res.status(200).json(comment)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    }

    public async getAll(req: Request, res:Response){
        try{
            const comments: CommentDocument[] | null = await commentService.findAll();
            res.json(comments)
        }
        catch (error){
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res:Response){
        try{
            const commentInput: CommentInput = {...req.body, "author":req.params.user_id, "authorName":req.params.user_name}
            const comment: CommentDocument | null = await commentService.update(req.params.id, commentInput);
            res.status(200).json(comment)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }

    public async delete(req: Request, res:Response){
        try{
            const comment: CommentDocument | null = await commentService.delete(req.params.id);
            res.status(200).json(comment)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }
}

export default new UserController();