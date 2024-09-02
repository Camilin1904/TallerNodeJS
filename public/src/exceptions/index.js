"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = exports.UserExistError = void 0;
var UserExistsError_1 = require("./UserExistsError");
Object.defineProperty(exports, "UserExistError", { enumerable: true, get: function () { return __importDefault(UserExistsError_1).default; } });
var NotAuthorizedError_1 = require("./NotAuthorizedError");
Object.defineProperty(exports, "NotAuthorizedError", { enumerable: true, get: function () { return __importDefault(NotAuthorizedError_1).default; } });
