"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserExistError extends Error {
    constructor(message) {
        super('');
        this.name = this.constructor.name;
        this.stack = message + ":" + this.stack;
    }
}
exports.default = UserExistError;
