import {
  Router
} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {
  Strategy as BearerStrategy
} from "passport-http-bearer"
import {
  Strategy as LocalStrategy
} from "passport-local"
import authController from "../controllers/authController"
import {
  decodeToken,
  generateAbilities
} from "../middlewares"
import {
  User
} from "../models"
import {
  KEY_SECRET_JWT,
  excluded_routes
} from "../config"
import {
  handlerErrorAct
} from "../errorHandlers"

const route = Router()

const response_error_message = field => ({
  message: `${field.toUpperCase()} is not correct.`
})

const cb_jwt = done => (err, val) => {
  if (err) return done(err)
  done(null, val)
}

// Generate new token on login function.
passport.use(
  new LocalStrategy({
    usernameField: 'email',
    session: false
  }, async (username, password, done) => {
    const user = await User.findOne({
      email: username
    }).select('+password')

    if (!user) return done(response_error_message('email'))

    if (!(await user.verifyPassword(password))) return done(response_error_message('password'))

    const {
      email,
      _id,
      nickname,
      fullName,
      role
    } = user

    return jwt.sign({
      nickname,
      email,
      _id,
      fullName,
      role
    }, KEY_SECRET_JWT, {
      expiresIn: '10m'
    }, cb_jwt(done))
  }))

// Verificate our token.
passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, KEY_SECRET_JWT, cb_jwt(done))
  }))

// Handler for exclude routes on ACL/JWT_Verification
route.all('*', (req, res, next) => {
  if (excluded_routes().includes(req.path)) return next('route')
  else next()
}, passport.authenticate('bearer', {
  session: false
}), generateAbilities)


route.post('/login', passport.authenticate('local', {
    session: false
  }),
  decodeToken, handlerErrorAct(authController.logIn))

// @include signup#handlers
route.post('/signup', handlerErrorAct(authController.signUp))
route.post('/signup/:id', handlerErrorAct(authController.updateUser))

export default route
