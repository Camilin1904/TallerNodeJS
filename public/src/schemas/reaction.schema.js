"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reactionSchema = (0, zod_1.object)({
    reaction: (0, zod_1.number)({ required_error: "number is required" })
        .min(1, "the reactions go from 1 to 5")
        .max(5, "the reactions go from 1 to 5")
});
exports.default = reactionSchema;
