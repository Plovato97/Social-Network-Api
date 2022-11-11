const { User, Thought } = require('../models');

const userController = {
    createUser({ body }, res) {
        User.create({ username: body.username, email: body.email, password: body.password})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    getUser(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // .populate({ 
            //     path: 'friends', 
            //     select: '-__v'
            // })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    getUserOne({ params, body }, res) {
        User.findOne(params)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({ 
                path: 'thoughts', 
                select: '-__v', 
                populate: { path: 'reactions'}
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
                Thought.deleteMany({ username: dbUserData.username})
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;