import express, {Express, Request, Response} from 'express';
import dotenv from "dotenv";
import { userRouter } from './routes/users.router';
import { commentRouter } from './routes/comment.router';
import { db } from '../config/db';

const app: Express = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Routes for user operations
app.use('/api/users', userRouter); 
//Routes for comment operations
app.use('/api/comments', commentRouter);


app.get('/',(req:Request, res:Response) => {
    res.send('Hello world :)');
});

db.then(() =>
    app.listen(PORT, () =>{
        console.log(`Server running on http://localhost:${PORT}`);
    })
);