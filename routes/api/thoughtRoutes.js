// Define the router
const router = require('express').Router();

// Get the methods from the thoughtController
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// ---------- Thought api routes ---------- //

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// ---------- Reaction api routes ---------- //

// /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions/')
    .post(addReaction)
    .delete(deleteReaction);

// api/thoughts/:thoughtId/reactions/:reactionId ???