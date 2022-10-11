const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Create function to get current date in a usable time stamp
function currentDate(date) {
    const formattedDate = new Date(date).toLocaleString("en-US");
    return formattedDate;
}

// currentDate function test // Working
    // now = Date.now();
    // console.log(currentDate(now));

// Schema to create new Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: currentDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual that retrieves the length of the reactions array field on query
thoughtSchema
    .virtual("reactionCount")
    .get(function () {
        return this.reactions.length // Count of reactions array
    });

// Initialize the User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;