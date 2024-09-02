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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const UserExistsError_1 = __importDefault(require("../exceptions/UserExistsError"));
const exceptions_1 = require("../exceptions");
class UserService {
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                //There must only be one user per email
                if (userExists)
                    throw new UserExistsError_1.default("User already exists");
                userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                //If there are no more users, a supr admin is created to ensure that there is always atleast one
                if ((yield user_model_1.default.find()).length == 0) {
                    const user = Object.assign(Object.assign({}, userInput), { role: "superadmin" });
                    const newUser = yield user_model_1.default.create(user);
                    return newUser;
                }
                else {
                    const user = Object.assign(Object.assign({}, userInput), { role: "user" });
                    const newUser = yield user_model_1.default.create(user);
                    return newUser;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                return this.hidePasswordList(users);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(id);
                return this.hidePassword(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                const user = yield user_model_1.default.findByIdAndUpdate(id, userInput, { returnOriginal: false });
                return this.hidePassword(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByIdAndDelete(id);
                return this.hidePassword(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                if (!userExists)
                    throw new UserExistsError_1.default("User does not exists");
                const isMatch = yield bcrypt_1.default.compare(userInput.password, userExists.password);
                if (!isMatch)
                    throw new exceptions_1.NotAuthorizedError("Not authorized");
                const token = this.generateToken(userExists);
                return { email: userExists.email, name: userExists.name, token: token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(user) {
        try {
            return jsonwebtoken_1.default.sign({ user_id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "5m" });
        }
        catch (error) {
            throw error;
        }
    }
    //Hides the password from fetches to the users
    hidePasswordList(users) {
        users.forEach((document, index) => {
            users[index] = this.hidePassword(document);
        });
        return users;
    }
    //The passwordless document
    hidePassword(user) {
        if (user == null) {
            return null;
        }
        else {
            try {
                const userDto = user.toObject();
                delete userDto.password;
                return userDto;
            }
            catch (error) {
                throw error;
            }
        }
    }
}
exports.default = new UserService();
