const express = require("express");
const app = express();
require('dotenv').config();

const config = require("./config/config");
const schema = require("./schema/schema");
const {graphqlHTTP: express_graphql} = require("express-graphql");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// to access any file from this folder from URL like http://localhost:3000/uploads/abc.jpg
// app.use('/uploads', express.static("uploads"));

// main route which will accept all graphql routes and forwards to relevant schema
// console.log()
app.use('/graphql', express_graphql({
    schema: schema.schema,
    graphiql: true
}));

app.listen(process.env.PORT || 3000, () => console.log('Server started'));

// importing all config
config;
