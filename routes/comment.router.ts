import express, {Request, Response} from "express";
import commentController from "../controllers/comment.controller";
import validateSchema from "../middlewares/validateSchema";
import commentSchema from "../schemas/comment.schema";
import auth from "../middlewares/auth";
import reactionController from "../controllers/reaction.controller";

export const commentRouter = express.Router();

commentRouter.post("/reactions/:commentId", auth, reactionController.create);

commentRouter.get("/reactions/:commentId", auth, reactionController.getAll);

commentRouter.get("/reactions/:commentId/:id", auth, reactionController.getReaction);

commentRouter.put("/reactions/:commentId/:id", auth, reactionController.update);

commentRouter.delete("/reactions/:commentId/:id", auth, reactionController.delete);


commentRouter.post("/", auth, validateSchema(commentSchema), commentController.create);

commentRouter.get("/", auth, commentController.getAll);

commentRouter.get("/:id", auth, commentController.getComment);

commentRouter.put("/:id", auth, commentController.update);

commentRouter.delete("/:id", auth, commentController.delete);

