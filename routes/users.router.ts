import express, {Request, Response} from "express";
import usersController from "../controllers/user.controller";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";

export const router = express.Router();


router.post("/", validateSchema(userSchema), usersController.create);

router.post("/login", usersController.login)

router.get("/", usersController.getAll);

router.get("/profile", auth, userController.getUser);

router.get("/:id", usersController.getUser);

router.put("/:id", usersController.update);

router.delete("/:id", usersController.delete);


router.get("/:id/group/:groupId", (req: Request, res:Response) => {
    res.send(`get user with id ${req.params.id} and group id ${req.params.groupId}`)
});