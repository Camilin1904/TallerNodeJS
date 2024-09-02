"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const comment_schema_1 = __importDefault(require("../schemas/comment.schema"));
const reaction_schema_1 = __importDefault(require("../schemas/reaction.schema"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const reaction_controller_1 = __importDefault(require("../controllers/reaction.controller"));
exports.commentRouter = express_1.default.Router();
//Reactions routes
exports.commentRouter.post("/reactions/:commentId", auth_1.default, (0, validateSchema_1.default)(reaction_schema_1.default), reaction_controller_1.default.create);
exports.commentRouter.get("/reactions/:commentId", auth_1.default, reaction_controller_1.default.getAll);
exports.commentRouter.get("/reactions/:commentId/:id", auth_1.default, reaction_controller_1.default.getReaction);
exports.commentRouter.put("/reactions/:commentId/:id", auth_1.default, (0, validateSchema_1.default)(reaction_schema_1.default), reaction_controller_1.default.update);
exports.commentRouter.delete("/reactions/:commentId/:id", auth_1.default, reaction_controller_1.default.delete);
//Comments routes
exports.commentRouter.post("/", auth_1.default, (0, validateSchema_1.default)(comment_schema_1.default), comment_controller_1.default.create);
exports.commentRouter.get("/", auth_1.default, comment_controller_1.default.getAll);
exports.commentRouter.get("/:id", auth_1.default, comment_controller_1.default.getComment);
exports.commentRouter.put("/:id", auth_1.default, (0, validateSchema_1.default)(comment_schema_1.default), comment_controller_1.default.update);
exports.commentRouter.delete("/:id", auth_1.default, comment_controller_1.default.delete);
