import express, {Request, Response} from "express";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import authRole from "../middlewares/authRole";

export const userRouter = express.Router();

// Pendiente por asignar validación jwt y autorización de rol
//Create
userRouter.post("/", auth, authRole, validateSchema(userSchema), userController.create);
//Login
userRouter.post("/login", userController.login)
//Get All
userRouter.get("/", auth, userController.getAll);
////userRouter.get("/profile", auth, userController.getUser);
//Get by Id
userRouter.get("/:id", auth, userController.getUser);
//Update
userRouter.put("/:id", auth, authRole, validateSchema(userSchema), userController.update);
//
userRouter.delete("/:id", auth, authRole, userController.delete);
