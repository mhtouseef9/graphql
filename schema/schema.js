const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.contoller');


// import graphqlHTTP from 'express-graphql';
// import {makeExecutableSchema} from 'graphql-tools';
var { buildSchema } = require('graphql');
const { makeExecutableSchema } = require("@graphql-tools/schema");

// All GraphQL schemas and types of each context or module
var typeDefs = buildSchema(`
    type Query {
        listUsers: [userType]
    },
    type Mutation {
        createUser(input: userInputType): userType
    }
    type userType {
        _id: ID
        email: String
        firstName: String
        lastName: String
        token: String
    }
    input userInputType {
        email: String!
        firstName: String
        lastName: String
        password: String
    }
`);

var resolvers = {
    Query: {
        listUsers: userController.listUsers
    },
    Mutation:{
        createUser: userController.createUser
    }
};

// combining resolver functions and their relevant field of request.
exports.schema = makeExecutableSchema({ typeDefs, resolvers });




// router.get("/", userController.getUsers)
// router.post("/", userController.createUser)
// router.post("/login", userController.login)

// module.exports = router;
