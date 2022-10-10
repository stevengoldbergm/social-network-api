const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create new Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        username: {
            type: String,
            required: true,
        }
    },
    {
        // reactions: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Reaction'
        // }
        reactions: [reactionSchema], // testing
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual that retrieves the length of the reactions array field on query
thoughtSchema
    .virtual("reactionCount")
    .get(function () {
        return this.reactions.length //Count of reactions array
    });

// Initialize the User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;