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
const reaction_service_1 = __importDefault(require("../services/reaction.service"));
const comment_model_1 = require("../models/comment.model");
const mongoose_1 = __importDefault(require("mongoose"));
class ReactionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //translates the numeric input that is required to its corresponding string
            try {
                var re = comment_model_1.reactions.VACIO;
                switch (req.body.reaction) {
                    case 1:
                        re = comment_model_1.reactions.ME_GUSTA;
                        break;
                    case 2:
                        re = comment_model_1.reactions.AMOR;
                        break;
                    case 3:
                        re = comment_model_1.reactions.EN_DESACUERDO;
                        break;
                    case 4:
                        re = comment_model_1.reactions.ME_ENTRISTESE;
                        break;
                    case 5:
                        re = comment_model_1.reactions.ME_ENFADA;
                        break;
                }
                //Builds the reaction input object
                const reactionInput = { "reaction": re, "author": new mongoose_1.default.Types.ObjectId(req.params.authId), "authorName": req.params.name };
                const reaction = yield reaction_service_1.default.create(req.params.commentId, reactionInput);
                res.status(201).json(reaction);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    getReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_service_1.default.findById(req.params.commentId, req.params.id);
                res.status(200).json(reaction);
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
                const reactions = yield reaction_service_1.default.findAll(req.params.commentId);
                res.json(reactions);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Translates the numeric input to its actual equivalent
            try {
                var re = comment_model_1.reactions.VACIO;
                switch (req.body.reaction) {
                    case 1:
                        re = comment_model_1.reactions.ME_GUSTA;
                        break;
                    case 2:
                        re = comment_model_1.reactions.AMOR;
                        break;
                    case 3:
                        re = comment_model_1.reactions.EN_DESACUERDO;
                        break;
                    case 4:
                        re = comment_model_1.reactions.ME_ENTRISTESE;
                        break;
                    case 5:
                        re = comment_model_1.reactions.ME_ENFADA;
                        break;
                }
                const reactionInput = { "reaction": re, "author": new mongoose_1.default.Types.ObjectId(req.params.id), "authorName": req.params.name };
                const reaction = yield reaction_service_1.default.update(req.params.commentId, req.params.id, reactionInput, req.params.authId);
                res.status(200).json(reaction);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_service_1.default.delete(req.params.commentId, req.params.id, req.params.authId);
                res.status(200).json(reaction);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new ReactionController();
