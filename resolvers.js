const user = {
    _id: "1",
    name: "Reed",
    email: "reed@yahoo.com",
    picture: "http://google.com/a.jpg"
};

module.exports = {
    Query: {
        me: () => user
    }
};
