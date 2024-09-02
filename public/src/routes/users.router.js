"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const authRole_1 = __importDefault(require("../middlewares/authRole"));
exports.userRouter = express_1.default.Router();
// Pendiente por asignar validación jwt y autorización de rol
//Create
exports.userRouter.post("/", auth_1.default, authRole_1.default, (0, validateSchema_1.default)(user_schema_1.default), user_controller_1.default.create);
//Login
exports.userRouter.post("/login", user_controller_1.default.login);
//Get All
exports.userRouter.get("/", auth_1.default, user_controller_1.default.getAll);
////userRouter.get("/profile", auth, userController.getUser);
//Get by Id
exports.userRouter.get("/:id", auth_1.default, user_controller_1.default.getUser);
//Update
exports.userRouter.put("/:id", auth_1.default, authRole_1.default, (0, validateSchema_1.default)(user_schema_1.default), user_controller_1.default.update);
//
exports.userRouter.delete("/:id", auth_1.default, authRole_1.default, user_controller_1.default.delete);
