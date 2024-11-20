import { gql } from "apollo-server";

export const fragments = gql`
    fragment TimestampFields on Timestamp {
        createdAt
        updatedAt
        deletedAt
    }

    fragment CoreUserFields on User {
        name
        email
    }

    fragment UserFields on User {
        _id
        name
        email
        role
    }

    fragment CommentFields on Comment {
        _id
        text
    }

    fragment ReactionFields on Reaction {
        _id
        reaction
    }
`;

const typeDefs = gql`
    ${fragments}

    type Login {
        token: String
        name: String!
        email: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        role: String!
        comments: [Comment]!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
    
    type Comment {
        _id: ID!
        text: String!
        parent: ID
    }

    type Reaction {
        _id: ID!
        reaction: Int!
        commentId: ID!  
    }

    type Query {
        login(email: String!, password: String!): Login!
        users: [User]!
        user(id: ID!): User
        comments: [Comment]!
        comment(id: ID!): Comment
        reactions(commentId: ID!): [Reaction]!
        reaction(commentId: ID!, id: ID!): Reaction
    }


    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        updateUser(id: ID!, name: String, email: String, password: String): User!
        deleteUser(id: ID!): User
        createComment(text: String!, parent: ID): Comment!
        updateComment(id: ID!, text: String): Comment!
        deleteComment(id: ID!): Comment
        createReaction(reaction: Int, commentId: ID!): Reaction!
        updateReaction(commentId: ID!, id: ID!, reaction: Int): Reaction!
        deleteReaction(commentId: ID!, id: ID!): Reaction!
    }


`;

export default typeDefs;