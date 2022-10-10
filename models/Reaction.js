const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought');


// Create function to get current date in a usable time stamp
function currentDate(date) {
    const formattedDate = new Date(date).toLocaleString("en-US");
    return formattedDate;
}
// currentDate function test // Working
    // now = Date.now();
    // console.log(currentDate(now));

// Create Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    },
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
    },
    {
        username: {
            type: String,
            required: true,
        },
    },
    {
        createdAt: {
            type: Date,
            get: currentDate(Date.now()),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;