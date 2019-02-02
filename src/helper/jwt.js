import expressJwt from 'express-jwt';
import userService from '../service/user.service';

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/user/authenticate',
      '/user/register'
    ]
  })
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}