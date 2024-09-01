import express, {Request, Response} from "express";
import commentController from "../controllers/comment.controller";
import validateSchema from "../middlewares/validateSchema";
import commentSchema from "../schemas/comment.schema";
import auth from "../middlewares/auth";

export const commentRouter = express.Router();

commentRouter.post("/", auth, validateSchema(commentSchema), commentController.create);

commentRouter.get("/", auth, commentController.getAll);

commentRouter.get("/:id", auth, commentController.getComment);

commentRouter.put("/:id", auth, commentController.update);

commentRouter.delete("/:id", auth, commentController.delete);
