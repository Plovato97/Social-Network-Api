const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
// const reactionRoutes = require('./reaction-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/user', userRoutes);
// router.use('/reaction', reactionRoutes)

module.exports = router;