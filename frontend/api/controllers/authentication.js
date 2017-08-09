import jwt from 'jwt-simple';
import User from '../models/User';
import config from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  // sub is subject - who is this token about
  // iat - issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

const signin = (req, res) => {
  // We know that user has its email and password authenticated
  // (see router.js and the use of middleware in the post /signin method)
  res.json({
    token: tokenForUser(req.user),
  });
};

const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide an email and a password!' });
  }
  // See if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    // If does - Error
    if (existingUser) {
      // Unprocessable entity
      return res.status(422).send({ error: 'Email is already in use!' });
    }
    // If does not -> create and save user record
    const user = new User({ email, password });
    user.save((error) => {
      if (error) {
        return next(error);
      }
      res.json({
        token: tokenForUser(user),
      });
    }); // Saving the user
  });
};

export default {
  signin,
  signup,
};
