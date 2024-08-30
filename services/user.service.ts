import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserDocument, UserInput } from "../models/user.model";
import UserModel from "../models/user.model"
import UserExistError from "../exceptions/UserExistsError";
import { NotAuthorizedError } from "../exceptions";

class UserService{

    public async create(UserInput: UserInput): Promise<UserDocument>{
        try{
            const userExists = await this.findByEmail(UserInput.email);
            if(userExists)
                throw new UserExistError("User already exists");
            
            UserInput.password = await bcrypt.hash(UserInput.password, 10);
            const user = await UserModel.create(UserInput);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    
    public async findAll(): Promise<UserDocument[]>{
        try{
            const users = await UserModel.find();
            return users
        }
        catch (error){
            throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null>{
        try{
            const users = await UserModel.findById(id);
            return users
        }
        catch (error){
            throw error;
        }
    }

    public async update(id: string, UserInput: UserInput): Promise<UserDocument | null>{
        try{
            const user : UserDocument | null = await UserModel.findByIdAndUpdate(id, UserInput, {returnOriginal:false});
            return user;
        }
       catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<UserDocument | null>{
        try{
            const user : UserDocument | null = await UserModel.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null>{
        try{
            const user : UserDocument | null = await UserModel.findOne({email});
            return user;
        }
        catch (error){
            throw error;
        }
    }

    public async login(userInput:any): Promise<any>{
        try{
            const userExists = await this.findByEmail(userInput.email);
            if(!userExists)
                throw new UserExistError("User does not exists");
            const isMatch : boolean = await bcrypt.compare(userInput.password, userExists.password);
            if(!isMatch)
                throw new NotAuthorizedError("Not authorized");
            const token = this.generateToken(userExists);
            return {email:userExists.email, name:userExists.name, token:token};
        }
        catch (error){
            throw error;
        }
    }

    private generateToken(user: UserDocument):string{
        try{
            return jwt.sign({user_id:user._id,email:user.email, name:user.name}, process.env.JWT_SECRET || "secret", {expiresIn:"5m"});
        }
        catch(error){
            throw error;
        }

    }
}

export default new UserService();

