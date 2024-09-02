import mongoose from "mongoose";
import {CommentDocument, CommentInput } from "../models/comment.model";
import CommentModel from "../models/comment.model";
import Comment from "../models/user.model"
import { ObjectId } from "mongodb";


export class CommentService {

    async create(commentText: CommentInput): Promise<CommentDocument> {

      const newComment = await CommentModel.create(commentText);
      if(commentText.parent){
          const parent = await CommentModel.findById(commentText.parent);
          if(parent){
            parent.comments.push(newComment);
            parent.save()
          }
      }

      return newComment;
    }

    public async findAll(): Promise<CommentDocument[] | null>{
      try{
          const comments = await CommentModel.find();
          console.log(comments)
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

    public async update(id: string, CommentInput: CommentInput): Promise<CommentDocument | null>{
      try{
          const comment : CommentDocument | null = await CommentModel.findByIdAndUpdate(id, CommentInput, {returnOriginal:false});
          if(comment?.parent){
            const parent: CommentDocument | null = await CommentModel.findById(comment.parent);
            if (parent){
              const inner = (parent.comments as mongoose.Types.DocumentArray<CommentDocument>).id(id);
              if(inner)
                inner.text = CommentInput.text;
              parent.save();
            }
          }
          return comment;
      }
     catch (error) {
          throw error;
      }
    }

    public async delete(id: string): Promise<CommentDocument | null>{
      try{
          const comment : CommentDocument | null = await CommentModel.findByIdAndDelete(id);
          if(comment?.parent){
            const parent: CommentDocument | null = await CommentModel.findById(comment.parent);
            if (parent){
              const inner = (parent.comments as mongoose.Types.DocumentArray<CommentDocument>).id(id);
              if(inner){
                const reactionIndex = parent.comments.findIndex(comm => comm._id === id)
                parent.comments.splice(reactionIndex, 1)
              }
                
              parent.save();
            }
          }
          return comment;
      }
      catch (error) {
          throw error;
      }
  }

}

export default new CommentService();