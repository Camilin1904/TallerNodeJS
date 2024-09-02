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
exports.CommentService = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const CommentDoesNotExistsError_1 = __importDefault(require("../exceptions/CommentDoesNotExistsError"));
const exceptions_1 = require("../exceptions");
class CommentService {
    create(commentText, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = yield comment_model_1.default.create(commentText);
            //If a comment is a response to annother comment, then it will have teh parameter parent
            //which contains the Id of the comment being aswered.
            if (commentText.parent) {
                const parent = yield comment_model_1.default.findById(commentText.parent);
                if (parent) {
                    parent.comments.push(newComment.id);
                    parent.save();
                }
                else {
                    //If the parent doesn't exist, then there is no reason why the comment should extst.
                    this.delete(newComment.id, userId);
                    throw new CommentDoesNotExistsError_1.default("The comment being answered does not exist.");
                }
            }
            return newComment;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_model_1.default.find();
                return comments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.default.findById(id);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, commentInput, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isOwner(userId, id)) {
                try {
                    const comment = yield comment_model_1.default.findByIdAndUpdate(id, commentInput, { returnOriginal: false });
                    return comment;
                }
                catch (error) {
                    throw error;
                }
            }
            else
                throw new exceptions_1.NotAuthorizedError("This user cannot nodify this comment");
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isOwner(userId, id)) {
                try {
                    const comment = yield comment_model_1.default.findByIdAndDelete(id);
                    //When a comment that has a son is deleted all the son comments should be deleted
                    yield comment_model_1.default.deleteMany({ parent: id });
                    //when a comment that has a parent is deleted, it should alse be removed from the list
                    ///of subcoments of the parent
                    if (comment === null || comment === void 0 ? void 0 : comment.parent) {
                        const parent = yield comment_model_1.default.findById(comment.parent);
                        if (parent) {
                            const reactionIndex = parent.comments.findIndex(comm => comm._id.toString() === id);
                            parent.comments.splice(reactionIndex, 1);
                            //After modifying a model with methods other that the CRUD methods, it is necesary to save
                            //the changes.
                            parent.save();
                        }
                    }
                    return comment;
                }
                catch (error) {
                    throw error;
                }
            }
            else
                throw new exceptions_1.NotAuthorizedError("This user cannot modify this comment");
        });
    }
    //Checks if any user is teh author of a comment.
    isOwner(authId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_model_1.default.findById(commentId);
            return authId == (comment === null || comment === void 0 ? void 0 : comment.author);
        });
    }
}
exports.CommentService = CommentService;
exports.default = new CommentService();
