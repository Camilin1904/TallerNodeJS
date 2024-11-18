import express from 'express';
import { ApolloServer } from 'apollo-server';
import dotenv from "dotenv";
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { db } from '../config/db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import auth from './middlewares/auth';

dotenv.config();

const app = express()

app.use(express.json())

// Ensure auth middleware is applied before Apollo Server
app.use(auth);

const PORT = process.env.PORT || 8000;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async ({ req, res }) => {

        const auth_routes = [
            "Users", "User", 
            "Comments", "Comment", 
            "Reactions", "Reaction", 
            "CreateUser", "UpdateUser", "DeleteUser", 
            "CreateComment", "UpdateComment", "DeleteComment", 
            "CreateReaction", "UpdateReaction"
        ];

        const not_allowed = auth_routes.includes(req.body.operationName);

        if (!not_allowed) {
            return {};
        }
        await new Promise((resolve, reject) => {
            auth(req, res, (err) => {
                if (err) reject(err);
                else resolve(null);
            });
        });
        const user = req.body.loggedUser;
        if (!user) {
            throw new Error("Not Authorized");
        }
        return { user };
    }   
});

db.then(() =>
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
);

