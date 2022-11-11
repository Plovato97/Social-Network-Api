const router = require('express').Router();
const { getThought, getThoughtById, createThought, updateThought, deleteThought, createReaction, removeReaction } = require('../../controllers/thought-controller');

router
.route('/')
.get(getThought)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtid/reactions')
.post(createReaction)

router
.route('/:thoughtid/reactions/:reactionid')
.delete(removeReaction)

module.exports = router;