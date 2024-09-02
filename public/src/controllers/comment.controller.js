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
const comment_service_1 = __importDefault(require("../services/comment.service"));
const CommentDoesNotExistsError_1 = __importDefault(require("../exceptions/CommentDoesNotExistsError"));
const exceptions_1 = require("../exceptions");
class CommentController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //To the content of the comment, the information of the author signed in is added, this information is stored
                //in the jwt generated when a user logs in.
                const commentInput = Object.assign(Object.assign({}, req.body), { "author": req.params.authId, "authorName": req.params.name });
                const comment = yield comment_service_1.default.create(commentInput, req.params.authId);
                res.status(201).json(comment);
            }
            catch (error) {
                console.log(error);
                //If the parent comment doesn't exists, then it is notifies to the sender of the request.
                if (error instanceof CommentDoesNotExistsError_1.default)
                    res.status(400).json("The comment being answered does not exist.");
                res.status(500).json(error);
            }
        });
    }
    getComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //the id of the comment is sent through url parameters
                const comment = yield comment_service_1.default.findById(req.params.id);
                res.status(200).json(comment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_service_1.default.findAll();
                res.json(comments);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //while the authos cannot change, it is required to build the comment input object the same as it was built
                //for creation.
                const commentInput = Object.assign(Object.assign({}, req.body), { "author": req.params.id, "authorName": req.params.name });
                const comment = yield comment_service_1.default.update(req.params.id, commentInput, req.params.authId);
                res.status(200).json(comment);
            }
            catch (error) {
                if (error instanceof exceptions_1.NotAuthorizedError) {
                    res.status(401).json("This user cannot modify this comment");
                }
                else {
                    res.status(500).json(error);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.delete(req.params.id, req.params.authId);
                res.status(200).json(comment);
            }
            catch (error) {
                if (error instanceof exceptions_1.NotAuthorizedError) {
                    res.status(401).json("This user cannot modify this comment");
                }
                else {
                    res.status(500).json(error);
                }
            }
        });
    }
}
exports.default = new CommentController();
