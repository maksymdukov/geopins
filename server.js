const {ApolloServer} = require("apollo-server");
require("dotenv").config();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const {findOrCreateUser} = require("./controllers/userController");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        let authToken = null;
        let currentUser = null;
        console.log('[context]');
        try {
            authToken = req.headers.authorization;
            console.log(authToken);
            if (authToken) {
                // find or create user
                currentUser = await findOrCreateUser(authToken);
            }
        } catch (err) {
            console.log(`Unable to authenticate user with token ${authToken}`);
        }
        return {currentUser};
    }
});

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        console.log("DB connected");
        server.listen().then(({url}) => {
            console.log("Server started on:", url);
        });
    })
    .catch(err => {
        console.log(err);
    });
