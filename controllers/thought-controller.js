const { Thought, User } = require('../models');


const thoughtController = {

    getThought(req, res) {
        Thought.find()
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err))
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err))
    },

    createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
        .then(({_id}) => User.findOneAndUpdate({ _id: body.userid}, { $push: { thoughts: _id } }, { new: true }))
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtid },
            body,
            { new: true }
        )
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtid })
            .then(deleteThought => {
                if (!deleteThought) {
                    return res.status(404).json({ message: 'No thoughts with this Id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userid },
                    { $pull: { thoughts: params.thoughtid } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // add a reaction to thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtid },
            { $push: { reactions: { reactionBody: body.reactionBody, username: body.username } } },
            { new: true, runValidators: true })
            .then(dbReaction => {
                if (!dbReaction) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return
                }else res.json(dbReaction)
            })
            .catch(err => res.json(err));
    },
    // remove a reaction from thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtid },
            { $pull: { reactions: { _id: params.reactionid } } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
}



module.exports = thoughtController;
