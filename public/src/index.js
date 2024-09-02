"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_router_1 = require("./routes/users.router");
const comment_router_1 = require("./routes/comment.router");
const db_1 = require("../config/db");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Routes for user operations
app.use('/api/users', users_router_1.userRouter);
//Routes for comment operations
app.use('/api/comments', comment_router_1.commentRouter);
app.get('/', (req, res) => {
    res.send('Hello world :)');
});
db_1.db.then(() => app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}));
