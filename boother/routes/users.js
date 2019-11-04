const express = require('express');
router = express.Router();
passport = require('passport');
jwt = require('jsonwebtoken');
config = require('../config/database');
Booth = require('../models/booth');
User = require('../models/user');
BoothCard = require('../models/boothcard');

//======//
// POST //
//======//

// Register User
router.post('/register', (req, res, next) => {
  // let password = "Lisses123";
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.email,
    password: req.body.password,
    // password: password,
    comments: req.body.comments
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      return res.json({ success: false, msg: 'User registration failed' });
    } else {
      res.json({ success: true, msg: 'User registration successful' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // -> 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            lastName: user.lastName,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }

    });
  });
});

//=====//
// GET //
//=====//

// User
router.get('/user-detail/:id', (req, res, next) => {
  User.getUserById(req.params.id, (err, user) => {
    if (err) throw err;
    res.json({ user: user });
  });
});

// All Users
router.get('/user-list', (req, res, next) => {
  User.getUsers((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

//=====//
// PUT //
//=====//

// Update
router.put('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.updateUser(
    id = req.body._id, {
      email: req.body.email,
      phone: req.body.phone,
      comments: req.body.comments,
      username: req.body.username,
      password: req.body.password,
    }, { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, msg: 'Duplicate information. Try again.' });      
      res.json(user);
    });
});

//========//
// DELETE //
//========//

// Remove
router.delete('/user-detail/:id', (req, res, next) => {
  User.removeUser(
    id = req.params.id,
    (err, user) => {
      if (err) throw err;
      res.json('');
    });
});

module.exports = router;