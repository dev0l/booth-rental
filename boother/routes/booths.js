const express = require('express');
router = express.Router();
// passport = require('passport');
// jwt = require('jsonwebtoken');
config = require('../config/database');
// User = require('../models/user');
Booth = require('../models/booth');
// BoothCard = require('../models/boothcard');

//======//
// POST //
//======//

// Register Booth
router.post('/booth-reg', (req, res, next) => {
  let newBooth = new Booth({
    bNr: req.body.bNr,
    rented: req.body.rented,
    rentedFrom: req.body.rentedFrom,
    rentedTo: req.body.rentedTo,
    paid: req.body.paid,
    renter: req.body.renter,
    comments: req.body.comments
  });

  Booth.addBooth(newBooth, (err, booth) => {
    if (err) {
      res.json({ success: false, msg: 'Booth registration failed' });
    } else {
      res.json({ success: true, msg: 'Booth registration successful' });
    }
  });
});

//=====//
// GET //
//=====//

// Booth - By /:Id
router.get('/booth-detail/:id', (req, res, next) => {
  Booth.getBoothById(req.params.id, (err, booth) => {
    if (err) console.log(err);
    // if (err) throw err;
    res.json({ booth: booth });
  });
});

// All Booths
router.get('/booth-list', (req, res, next) => {
  Booth.getBooths((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//=====//
// PUT //
//=====//

// Update
router.put('/boothz', (req, res, next) => {
  //   zero = (req, res) => {
  //   if (Booth.rentedFrom === true)
  //   console.log("MARK IT ZERO");
  // };
  Booth.updateBooth(
    id = req.body._id, {
      // rented: () => {
      //   console.log(rentedFrom);
      //   if (rentedFrom !== true) {
      //     rented = false;
      //   }
      //   else {
      //     console.log(rentedFrom);
      //   }
      // },
      // rented: zero(),
      rented: req.body.rented,
      rentedFrom: req.body.rentedFrom,
      rentedTo: req.body.rentedTo,
      paid: req.body.paid,
      comments: req.body.comments
    }, { new: true },
    (err, booth) => {
      if (err) return res.json({ success: false, msg: 'Duplicate information. Try again.' });
      // if ($('input.checkbox_check').is(':checked')) {}
      // if (booth.rentedFrom !== false) { booth.rented = true; }
      // console.log(booth.rentedFrom);
      // console.log(booth.rented);
      // rented = booth.rented;
      res.json(booth);
    });
});

// // Populate (Renter)
// router.put('/booth-renter', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   const query = Booth.findById(req.body._id);
//   query.exec((err, booth) => {
//     if (err) { return next(err); }
//     if (!booth) { return next(new Error('Can not find Booth')); }

//     let renter = req.user;

//     renter.username = req.body.username;

//     req.Booth = booth;
//     if (booth.rented === true) {
//       return next(new Error('Booth is occupied'));
//     }
//     booth.rented = true;
//     booth.period = req.body.period;
//     booth.paid = req.body.paid;

//     renter.save((err, user) => {
//       if (err) { return next(err); }
//       req.Booth.renter = req.user;
//       // req.user.booths.push(booth);
//       req.Booth.save((err, booth) => {
//         if (err) { return next(err); }
//         res.json(booth);
//       });
//     });

//   });
// });

//========//
// DELETE //
//========//

// Remove
router.delete('/booth-detail/:id', (req, res, next) => {
  Booth.removeBooth(
    id = req.params.id,
    (err, booth) => {
      if (err) throw err;
      res.json('');
    });
});

module.exports = router;