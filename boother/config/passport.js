const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
      User = require('../models/user');
      config = require('../config/database');

module.exports = (passport) => {
  let opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) => {
    // User.getUserById(jwt_payload.sub, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
        // or you could create a new account
      }
    });
  }));
};
