import express, {Request, Response} from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";
import {UserExistError, NotAuthorizedError} from "../exceptions";


class UserController {
    public async create(req:Request, res:Response){
        try{
            const user: UserDocument = await userService.create(req.body as UserInput);
            res.status(201).json(user)
        }
        catch (error){
            if (error instanceof UserExistError){
                res.status(400).json("User already exists")

            }
            res.status(500).json(error)
        }
        
    }

    public async getUser(req: Request, res:Response){
        try{
            const user: UserDocument | null = await userService.findById(req.params.id);
            res.status(200).json(user)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    }

    public async getAll(req: Request, res:Response){
        try{
            const users: UserDocument[] | null = await userService.findAll();
            res.json(users)
        }
        catch (error){
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res:Response){
        try{
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            res.status(200).json(user)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }

    public async delete(req: Request, res:Response){
        try{
            const user: UserDocument | null = await userService.delete(req.params.authId);
            res.status(200).json(user)
        }
        catch (error){
            console.log(error)
            res.status(500).json(error)
        }
        
    }

    public async login(req: Request, res:Response){
        try{
            const userObj = await userService.login(req.body);
            res.status(200).json(userObj)
        }
        catch (error){
            console.log(error)
            if (error instanceof UserExistError){
                res.status(400).json("User does not exists")
            }

            if(error instanceof NotAuthorizedError){
                res.status(400).json("Not Authorized")
            }
            res.status(500).json(error)
        }
        
    }
}

export default new UserController();