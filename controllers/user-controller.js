const { User, Thought } = require('../models');

const userController = {
    // POST /api/user
    // expected body:
    // {
    //     "username": "foo",
    //     "email": "bar@baz.com"  // must follow the email format
    // }
    createUser({ body }, res) {
        User.create({ username: body.username, email: body.email, password: body.password })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },
    // GET /api/user
    getUser(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({ 
                path: 'friends', 
                select: '-__v'
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },
    // GET /api/user/:id
    getUserOne({ params, body }, res) {
        User.findOne({ _id: params.userid })
            .populate({ 
                path: 'friends', 
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
    // PUT /api/user/:id
    // expected body includes at least one of the attributes below:
    // {
    //     "username": "foo",
    //     "email": "bar@baz.com"  // must follow the email format
    // }
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userid },
            body,
            { new: true }
        )
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    // DELETE /api/user/:id
    removeUser({ params, body }, res) {
        User.findOneAndDelete({ _id: params.userid })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id!' });
                    return
                }
                // Thought.deleteMany({ username: dbUserData.username })
                // .then(deleteData => res.json(deleteData))
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // add a friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userid }, { $push: { friends: params.friendid } }, { new: true, runValidators: true })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    // remove a friend from user 
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userid }, { $pull: { friends: params.friendid } })
            .then(dbUserData => res.status(200).json(user204Message(params.friendId, 'User')))
            .catch(err => res.json(err))
    }
}

module.exports = userController;