const { User } = require('../models');

const userController = {
    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    getUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    getUserOne({ params, body }, res) {
        User.findOne(params)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userid },
            body,
            { new: true }
        )
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    removeUser({ params, body }, res) {
        User.findOneAndDelete({ _id: params.userid })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id!' });
                    return
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;