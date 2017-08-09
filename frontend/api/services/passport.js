import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../models/User';
import config from '../config';

// Local strategy:
const localOptions = {
  // As we are using emails instead of usernames; Passport is included by default
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify email and password
  User.findOne({ email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    } // No user found
    user.comparePassword(password, function (error, isMatch) {
      if (error) {
        return done(error);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user); // Assigns user to req.user (see authentication.js and signin method)
    });
  });
});

// Setup options for JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Look at the request header, and get the 'authorization' object
  secretOrKey: config.secret,
};

// Create JwtStrategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // Payload is decoded JwtToken
  // See if the user ID in the payload exists in the database
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    } // False as a user object - we did not findById
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use the strategies
passport.use(jwtLogin);
passport.use(localLogin);
