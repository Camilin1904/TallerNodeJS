import { gql } from "apollo-server";

const typeDefs = gql`

  type Login {
        token: String
        email: String
        name: String
  }

  type User {
        _id: ID
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
        author: User!
        authorName: String!
        comments: [Comment]
        parent: Comment
        reactions: [Reaction]
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }

    type Reaction {
        reaction: String!
        author: User!
        authorName: String!
        createdAt: String!
        deletedAt: String
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
        updateReaction(commentId: ID!, id: ID!, reaction: String, author: ID, authorName: String): Reaction!
    }
`;

export default typeDefs;