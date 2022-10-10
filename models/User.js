const { Schema, model } = require('mongoose');

// Create a validation function for e-mail
const validateEmail = (email) => {
    const validator = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i
    return validator.test(email);

}

// test email validation
    // console.log(validateEmail('Abc_123+@testMaIl.co.com')); // returns true

// Schema to create new User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        }
    },
    {
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, "Please use a valid e-mail address"],
        } 
    },
    {
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    },
    {
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual that retrieves the length of the user's friend array field on query
userSchema
    .virtual("friendCount")
    .get(function () {
        return this.friends.length //Count of friend array
    });

// Initialize the User model
const User = model('user', userSchema);

module.exports = User;