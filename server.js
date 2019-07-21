const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

require("dotenv").config();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("DB connected");
        server.listen().then(({ url }) => {
            console.log("Server started on:", url);
        });
        
    })
    .catch(err => {
        console.log(err);
    });