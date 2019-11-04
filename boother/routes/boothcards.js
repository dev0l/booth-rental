const express = require('express');
router = express.Router();
passport = require('passport');
jwt = require('jsonwebtoken');
config = require('../config/database');
User = require('../models/user');
Booth = require('../models/booth');
BoothCard = require('../models/boothcard');

//======//
// POST //
//======//

// Register Booth Card
router.post('/boothcard-reg', (req, res, next) => {
  let newBoothCard = new BoothCard({
    bCNr: req.body.bCNr,
  });

  BoothCard.addBooth(newBoothCard, (err, boothcard) => {
    if (err) {
      res.json({ success: false, msg: 'BoothCard registration failed' });
    } else {
      res.json({ success: true, msg: 'BoothCard registration successful' });
    }
  });
});

//=====//
// GET //
//=====//

// Booth Card - By /:Id
router.get('/boothcard/:id', (req, res, next) => {
  BoothCard.getBoothById(req.params.id, (err, boothcard) => {
    if (!boothcard) {
      return res.json({ success: false, msg: 'Booth not found' });
    } else {
      res.json({
        success: true,
        boothcard: {
          id: boothcard._id,
          bCNr: boothcard.bCNr
        }
      });
    }
  });
});

// All Booth Cards
router.get('/boothcard-list', (req, res, next) => {
  BoothCard.getBoothCards((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//=====//
// PUT //
//=====//

// Update
router.put('/boothcard', (req, res, next) => {
  BoothCard.updateBoothCard(
    id = req.body._id, {
      bCNr: req.body.bCNr,
      period: req.body.period,
      owner: req.body.owner,
    }, { new: true },
    (err, boothCard) => {
      if (err) throw err;
      res.json(boothCard);
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
router.delete('/boothcard', (req, res, next) => {
  BoothCard.removeBoothCard(
    id = req.body._id,
    (err, boothcard) => {
      if (err) throw err;
      res.json('');
    });
});

module.exports = router;