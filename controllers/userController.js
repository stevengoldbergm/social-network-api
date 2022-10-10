// Import the User model
const { User } = require('../models');

// ---------- Export methods ---------- //
module.exports = {
    // ---------- User api calls ---------- //
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id and populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v') // What does this do?
    }

    // createUser | POST a new user

    // updateSingleUser | PUT to update a user by its _id

    // deleteSingleUser | DELETE to remove a user by its _id
        // BONUS: Can it delete associated thoughts when deleted?

    // ---------- Friends api calls ---------- //

    // getFriendList | GET all friends

    // addFriend | POST to add a new friend to a user's friend list

    // deleteFriend | DELETE to remove a friend from a user's friend list
}