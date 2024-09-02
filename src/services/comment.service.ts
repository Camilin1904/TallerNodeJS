import mongoose from "mongoose";
import {CommentDocument, CommentInput } from "../models/comment.model";
import CommentModel from "../models/comment.model";
import Comment from "../models/user.model"
import { ObjectId } from "mongodb";
import CommentDoesNotExistError from "../exceptions/CommentDoesNotExistsError";
import { error } from "console";
import { NotAuthorizedError } from "../exceptions";


export class CommentService {

    async create(commentText: CommentInput, userId: string): Promise<CommentDocument> {

      const newComment = await CommentModel.create(commentText);
      //If a comment is a response to annother comment, then it will have teh parameter parent
      //which contains the Id of the comment being aswered.
      if(commentText.parent){

          const parent = await CommentModel.findById(commentText.parent);
          if(parent){
            parent.comments.push(newComment.id);
            parent.save()
          }
          else{
            //If the parent doesn't exist, then there is no reason why the comment should extst.
            this.delete(newComment.id, userId)
            throw new CommentDoesNotExistError("The comment being answered does not exist.")
          }
      }

      return newComment;
    }

    public async findAll(): Promise<CommentDocument[] | null>{
      try{
          const comments = await CommentModel.find();
          return comments;
      }
      catch (error){
          throw error;
      }
    }

    public async findById(id: string): Promise<CommentDocument | null>{
        try{
            const comment = await CommentModel.findById(id);
            return comment
        }
        catch (error){
            throw error;
        }
    }

    public async update(id: string, commentInput: CommentInput, userId: string): Promise<CommentDocument | null> {
      if(await this.isOwner(userId, id)){
        try {
            const comment: CommentDocument | null = await CommentModel.findByIdAndUpdate(id, commentInput, { returnOriginal: false });
            return comment;
        } catch (error) {
            throw error;
        }
      }
      else throw new NotAuthorizedError("This user cannot nodify this comment")
  
    }

    public async delete(id: string, userId: string): Promise<CommentDocument | null>{
      if(await this.isOwner(userId, id)){
        try{
            const comment : CommentDocument | null = await CommentModel.findByIdAndDelete(id);
            //When a comment that has a son is deleted all the son comments should be deleted
            await CommentModel.deleteMany({parent:id})
            //when a comment that has a parent is deleted, it should alse be removed from the list
            ///of subcoments of the parent
            if(comment?.parent){
              const parent: CommentDocument | null = await CommentModel.findById(comment.parent);
              if (parent){

                const reactionIndex = parent.comments.findIndex(comm => comm._id.toString() === id)
                parent.comments.splice(reactionIndex, 1);
                //After modifying a model with methods other that the CRUD methods, it is necesary to save
                //the changes.
                parent.save();
                
              }
            }
            return comment;
        }
        catch (error) {
            throw error;
        }
      }
      else throw new NotAuthorizedError("This user cannot modify this comment")

    }
    //Checks if any user is teh author of a comment.
    async isOwner(authId: string, commentId: string): Promise<boolean>{
      const comment = await CommentModel.findById(commentId);
      return authId==comment?.author
    }
  

}

export default new CommentService();