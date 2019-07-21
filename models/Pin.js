const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        image: String,
        longtitude: Number,
        latitude: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [
            {
                createdAt: { type: Date, default: Date.now },
                text: String,
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Pin', PinSchema);
