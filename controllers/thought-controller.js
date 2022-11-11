const { Thought, User } = require('../models');

const thoughtController = {

    getThought(req, res) {
        Thought.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userid },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughts => {
                if (!dbThoughts) {
                    res.status(404).json({ message: 'No Thoughts found with this id!'});
                    return
                }
                res.json(dbThoughts)
            })
            .catch(err => res.json(err));
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
    }

}




module.exports = thoughtController;
