import express, {Request, Response} from "express";
import { CommentDocument,CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";
import CommentDoesNotExistError from "../exceptions/CommentDoesNotExistsError";
import { NotAuthorizedError } from "../exceptions";


class CommentController {


    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    public async create(req:Request, res:Response){
        try{
            //To the content of the comment, the information of the author signed in is added, this information is stored
            //in the jwt generated when a user logs in.
            const commentInput: CommentInput = {...req.body, "author":req.params.authId, "authorName":req.params.name}

            const comment: CommentDocument = await commentService.create(commentInput, req.params.authId);
            res.status(201).json(comment)
        }
        catch (error){
            console.log(error)
            //If the parent comment doesn't exists, then it is notifies to the sender of the request.
            if(error instanceof CommentDoesNotExistError)
                res.status(400).json("The comment being answered does not exist.")
                
            res.status(500).json(error)
        }
        
    }

    public async getComment(req: Request, res:Response){
        try{
            //the id of the comment is sent through url parameters
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
            //while the authos cannot change, it is required to build the comment input object the same as it was built
            //for creation.
            const commentInput: CommentInput = {...req.body, "author":req.params.id, "authorName":req.params.name}
            const comment: CommentDocument | null = await commentService.update(req.params.id, commentInput, req.params.authId);
            res.status(200).json(comment)
        }
        catch (error){
            if(error instanceof NotAuthorizedError){
                res.status(401).json("This user cannot modify this comment")
            }else{
                res.status(500).json(error)
            }
        }
        
    }

    public async delete(req: Request, res:Response){
        try{
            const comment: CommentDocument | null = await commentService.delete(req.params.id, req.params.authId);
            res.status(200).json(comment)
        }
        catch (error){
            if(error instanceof NotAuthorizedError){
                res.status(401).json("This user cannot modify this comment")
            }else{
                res.status(500).json(error)
            }
        }
        
    }
}

export default new CommentController();