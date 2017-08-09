import passport from 'passport';
import Authentication from '../controllers/authentication';

const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default (server) => {
  // Any request coming to '/' must go through require auth middleware
  server.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABCEFG. You will get D later! ;)' });
  });
  server.post('/signin', requireSignin, Authentication.signin); // Authenticate user using requireSignin (passport local strategy) before proceeding to controller
  server.post('/signup', Authentication.signup);
};
