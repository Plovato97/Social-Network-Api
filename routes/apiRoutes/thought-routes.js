const router = require('express').Router();
const { getThought, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

router
.route('/')
.get(getThought)

router
.route('/:userid')
.post(createThought)


router
.route('/:thoughtid')
.put(updateThought)

router
.route('/delete/:userid/:thoughtid')
.delete(deleteThought)


module.exports = router;