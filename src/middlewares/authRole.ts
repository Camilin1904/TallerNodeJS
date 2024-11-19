import { Request, Response, NextFunction } from "express";

const authRole = async(req:Request, res:Response, next:NextFunction)=>{
    if(req.params.role=="superadmin"){
        next()
    }else{
        console.log("Not Authorized Role")
        res.status(401).json({message:"Not Authorized Role"})
    }
}
export default authRole;