// Define the router
const router = require('express').Router();

// Get the methods from the userController
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getFriendList,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// ---------- User api routes ---------- //

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// ---------- Friend api routes ---------- //

//api/users/:userId/friends/
router.route('/:userId/friends/')
    .get(getFriendList)

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)