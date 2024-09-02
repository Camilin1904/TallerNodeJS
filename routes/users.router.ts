import express, {Request, Response} from "express";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import authRole from "../middlewares/roleAuth";

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
userRouter.put("/:id", auth, authRole, userController.update);
//
userRouter.delete("/:id", auth, authRole, userController.delete);


userRouter.get("/:id/group/:groupId", (req: Request, res:Response) => {
    res.send(`get user with id ${req.params.id} and group id ${req.params.groupId}`)
});