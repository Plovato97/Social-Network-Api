const router = require('express').Router();
const { getUser, createUser, getUserOne, updateUser, removeUser } = require('../../controllers/user-controller');


router
.route('/')
.get(getUser)
.post(createUser);

router
.route('/:userid')
.get(getUserOne)
.put(updateUser)
.delete(removeUser)

router
.route('/:userid/friends/:friendid')
// .post(addFriend)
// .delete(removeFriend)

module.exports = router;