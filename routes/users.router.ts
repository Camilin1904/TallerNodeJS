import express, {Request, Response} from "express";
import usersController from "../controllers/user.controller";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import authRole from "../middlewares/roleAuth";

export const userRouter = express.Router();

// Pendiente por asignar validación jwt y autorización de rol
//Create
userRouter.post("/", validateSchema(userSchema), usersController.create);
//Login
userRouter.post("/login", usersController.login)
//Get All
userRouter.get("/", auth, usersController.getAll);
////
userRouter.get("/profile", auth, userController.getUser);
//Get by Id
userRouter.get("/:id", auth, usersController.getUser);
//Update
userRouter.put("/:id", auth, authRole, usersController.update);
//
userRouter.delete("/:id", auth, authRole, usersController.delete);


userRouter.get("/:id/group/:groupId", (req: Request, res:Response) => {
    res.send(`get user with id ${req.params.id} and group id ${req.params.groupId}`)
});