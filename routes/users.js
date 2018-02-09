var express = require('express');
var userService = require('../services/usersService');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = userService.getAllUsers();
  res.render('users', {title: "All Users", users: users});
});

/* GET particular user. */
router.get('/:user_id', function (req, res, next) {
  var userId = req.params.user_id;
  res.send(userService.findUserWithId(userId));
});

/* GET direct friends for a particular user. */
router.get('/:user_id/friends', function (req, res, next) {
  var userId = req.params.user_id;
  var user = userService.findUserWithId(userId);
  var directFriends = userService.getDirectFriendsOfUser(user);
  res.render('users', {title: "Direct Friends for " + user.firstName + " " + user.surname, users: directFriends});
});

/* GET friends of friends for a particular user. */
router.get('/:user_id/friends_of_friends', function (req, res, next) {
  var userId = req.params.user_id;
  var user = userService.findUserWithId(userId);

  var friendsOfFriends = userService.getFriendsOfFriends(user);
  res.render('users', {title: "Friends of friends for " + user.firstName + " " + user.surname, users: friendsOfFriends});
});

/* GET suggested friends for a particular user. */
router.get('/:user_id/suggested_friends', function (req, res, next) {
  var userId = req.params.user_id;
  var user = userService.findUserWithId(userId);

  var suggestedFriends = userService.getSuggestedFriends(user);
  res.render('users', {title: "Suggested friends for " + user.firstName + " " + user.surname, users: suggestedFriends });
});

module.exports = router;