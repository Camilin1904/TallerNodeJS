"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Reaction ennumeration, as typescript dosnt lik regular js enums
exports.reactions = {
    ME_GUSTA: "ME_GUSTA",
    AMOR: "AMOR",
    EN_DESACUERDO: "EN_DESACUERDO",
    ME_ENTRISTESE: "ME_ENTRISTESE",
    ME_ENFADA: "ME_ENFADA",
    VACIO: "VACIO"
};
const reactionSchema = new mongoose_1.default.Schema({
    reaction: { type: String, required: true },
    author: { type: mongoose_1.default.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
});
const commentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    author: { type: mongoose_1.default.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
    //Comments can respond to other comments, only their Id is saved
    comments: [{ type: mongoose_1.default.Types.ObjectId, required: false }],
    parent: { type: mongoose_1.default.Types.ObjectId, required: false },
    //reactions are emedded into comments
    reactions: [reactionSchema]
}, { timestamps: true, collection: "comments" });
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
