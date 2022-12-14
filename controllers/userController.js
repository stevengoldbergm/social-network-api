// Import the User model
const { User, Thought } = require('../models');

// ---------- Export methods ---------- //

module.exports = {

    // ---------- User api calls ---------- //

    // GET all users
    getUsers(req, res) {
        User.find()
            .select('-__v',) // don't select the versionKey
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id and populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v') // don't select the versionKey
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST a new user
        // req.body looks like:
            // {
            //     "username": "value",
            //     "email": "value"
            // }
    createUser(req, res) {
        console.log(req.body);
        User.create(req.body)
            .then((newUserData) => res.json(newUserData))
            .catch((err) => res.status(500).json(err));
    },
    // PUT to update a user by its _id
        // req.body looks like:
            // {
            //     "username": "value",
            //     "email": "value",
            // }
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, // find by _id
            { $set: req.body }, // new values
            { runValidators: true, new: true } // run validators, return updated object
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with is id!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' })
            } else {
                Thought.deleteMany({ _id: { $in: user.thoughts } })
                .then(() => {
                    User.updateMany(
                        { friends: { _id: req.params.userId } },
                        { $pull: { friends: req.params.userId } },
                        { runValidators: true, new: true }
                    )
                    .then((user) => console.log(user))
                    .catch((err) => res.status(500).json(err));
                })
                .catch((err) => res.status(500).json(err));
            } 
        })
        .then(() => res.json({ message: "User, associated thoughts, and friends list presence deleted!" }))
        .catch((err) => res.status(500).json(err));
    },

    // ---------- Friends api calls ---------- //

    // GET all friends // Added for clarity
    getFriendList(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({ path: 'friends', select: '-__v' })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user.friends)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};

