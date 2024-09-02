"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const commentSchema = (0, zod_1.object)({
    text: (0, zod_1.string)({ required_error: "text is required" })
        .min(1, "Comment must be at least 1 character")
});
exports.default = commentSchema;
