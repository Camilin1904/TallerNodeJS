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
const user_service_1 = __importDefault(require("../services/user.service"));
const exceptions_1 = require("../exceptions");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.create(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof exceptions_1.UserExistError) {
                    //Users are unique
                    res.status(400).json("User already exists");
                }
                res.status(500).json(error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findById(req.params.id);
                res.status(200).json(user);
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
                const users = yield user_service_1.default.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.update(req.params.id, req.body);
                res.status(200).json(user);
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
                const user = yield user_service_1.default.delete(req.params.authId);
                res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObj = yield user_service_1.default.login(req.body);
                res.status(200).json(userObj);
            }
            catch (error) {
                console.log(error);
                if (error instanceof exceptions_1.UserExistError) {
                    res.status(400).json("User does not exists");
                }
                if (error instanceof exceptions_1.NotAuthorizedError) {
                    res.status(400).json("Not Authorized");
                }
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new UserController();
