// const { Thought, Reaction } = require('../models');


// const reactionController = {

//     findReaction(req, res){
//         Reaction.find()
//         .then(data => res.json(data))
//         .catch(err => res.json(err));
//     },

// createReaction({ params, body}, res) {
//     Reaction.create(body)
//     .then(({ _id }) => {
//         return Thought.findOneAndUpdate(
//             { _id: params.thoughtid },
//             { $push: { reactions: _id } },
//             { new: true }
//         );
//     })
//     .then(dbThoughts => {
//         if (!dbThoughts) {
//             res.status(404).json({ message: 'No Thoughts found with this id!'});
//             return
//         }
//         res.json(dbThoughts)
//     })
//     .catch(err => res.json(err));
// }

// }

// module.exports = reactionController;