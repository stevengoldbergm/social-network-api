// Import models and the Reaction schema
const { User, Thought, Reaction } = require('../models');

// ---------- Export methods ---------- //
module.exports = {
    // ---------- Thought api calls ---------- //
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v') // Don't select the versionKey
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            );
    },
    // POST a new thought and push the created thought's _id to the associated user's thoughts array field
        // req.body looks like:
            // {
            //     "thoughtText": "value",
            //     "username": "value"
            // }
    createThought(req, res) {
        // Find user from username
        User.findOne({ username: req.body.username })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that username!' })
                    // Create Thought
                    : Thought.create(req.body)
                        .then((newThought) => 
                            !newThought 
                                ? res.status(404).json({ message: 'Invalid Thought!' })
                                // Add Thought to user.thoughts array
                                : User.findOneAndUpdate(
                                    { username: req.body.username },
                                    { $addToSet: { thoughts: newThought } },
                                    { runValidators:true, new:true }
                                )
                        )
                        .then((updatedUser) =>
                            !updatedUser    
                                ? res.status(404).json({ message: 'User Thought Update Failed!' })
                                : res.json(updatedUser)
                        )
                        .catch((err) => res.status(500).json(err + '\nInner Error\n'))
                )
            .catch((err) => res.status(500).json(err));

    },
    // PUT to update a thought by its _id
        // req.body looks like:
            // {
            //     "thoughtText": "value"
            // }
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .select('-__v') // Don't select the versionKey
        .then((thought) =>
            !thought   
                ? res.status(404).json({ message: 'No thought with is id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with is id!' })
                : User.findOneAndUpdate(
                    { username: thought.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { runValidators:true, new:true }
                )
                .then(() => Thought.findOneAndDelete({ _id: req.params.thoughtId }))
                .catch((err) => res.status(500).json(err))
        )
        .then(() => res.status(200).json(
            { message: "Thought deleted and removed from user thoughts array." }
        ))
                // Reaction.deleteMany({ _id: { $in: thought.reactions }})
                // .then((thought) => 
                //     res.json({ message: "Thought deleted from memory." })
                // )
        .catch((err) => res.status(500).json(err));
    },

    // ---------- Reaction api calls ---------- //
    // POST new reaction to the reactions array
        // req.body looks like:
            // {
            //     "reactionBody": "value"
            //      "username": "value"
            // }
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a reaction from a thought's reaction array
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};

