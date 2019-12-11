const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controllers');

const User = require('../models/User.model');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect,
  authorize
} = require('../middleware/auth');

router.use(protect);
router.use(authorize('user'));

router
  .route('/')
  .get(advancedResults(User), getUsers)
//.post(createUser);

module.exports = router;