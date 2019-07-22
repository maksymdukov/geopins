const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
    //verify auth token
    const googleUser = await verifyAuthToken(token);
    // check if user exists
    const user = await checkIfUserExist(googleUser.email);
    // if user exists return them, otherwise create new user in our DB
    return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });
        return ticket.getPayload();
    } catch (err) {
        console.log("Error verifying auth token", err);
    }
};

const checkIfUserExist = async email => {
    return await User.findOne({ email }).exec();
};

const createNewUser = googleUser => {
    const { name, email, picture } = googleUser;
    const user = { name, email, picture };
    return new User(user).save();
};