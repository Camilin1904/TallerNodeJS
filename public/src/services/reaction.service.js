"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionService = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const exceptions_1 = require("../exceptions");
class ReactionService {
    create(commentId, reactionText) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_model_1.default.findById(commentId);
            //If there is no comment, thre cannot be a reaction.
            if (!comment)
                throw new Error('Comment not found');
            //This step is necesary as an object of type reaction input is not
            //accepted by the push method.
            const newReaction = Object.assign(Object.assign({}, reactionText), { updatedAt: new Date() });
            comment.reactions.push(newReaction);
            comment.save();
            return newReaction;
        });
    }
    findById(commentId, reactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            //limits the ammount of fields to use
            const comment = yield comment_model_1.default.findById(commentId).select('reactions');
            if (!comment)
                throw new Error('Comment not found');
            const reaction = comment.reactions.id(reactionId);
            return reaction;
        });
    }
    findAll(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_model_1.default.findById(commentId).select('reactions');
            if (!comment)
                throw new Error('Comment not found');
            return comment.reactions;
        });
    }
    update(commentId, reactionId, newText, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isOwner(userId, reactionId)) {
                const comment = yield comment_model_1.default.findById(commentId);
                if (!comment)
                    throw new Error('Comment not found');
                const reaction = comment.reactions.id(reactionId);
                if (!reaction)
                    throw new Error('Reaction not found');
                //The only thing that can be edited is the reaction, 
                //the author is no be left untouched.
                reaction.reaction = newText.reaction;
                comment.save();
                return reaction;
            }
            else
                throw new exceptions_1.NotAuthorizedError("This user cannot nodify this comment");
        });
    }
    delete(commentId, reactionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isOwner(userId, reactionId)) {
                const comment = yield comment_model_1.default.findById(commentId);
                if (!comment)
                    throw new Error('Comment not found');
                const reaction = comment.reactions.id(reactionId);
                if (!reaction)
                    throw new Error('Reaction not found');
                const reactionIndex = comment.reactions.findIndex(treaction => treaction._id === reaction._id);
                comment.reactions.splice(reactionIndex, 1);
                comment.save();
                return reaction;
            }
            else
                throw new exceptions_1.NotAuthorizedError("This user cannot nodify this comment");
        });
    }
    isOwner(authId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_model_1.default.findById(commentId);
            return authId == (comment === null || comment === void 0 ? void 0 : comment.author);
        });
    }
}
exports.ReactionService = ReactionService;
exports.default = new ReactionService();
