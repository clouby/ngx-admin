import express from "express"
import Debug from "debug"
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import {
  Strategy as BearerStrategy
} from "passport-http-bearer"
import {
  Strategy as LocalStrategy
} from "passport-local"
import {
  auth,
  pages
} from "./routes"
import {
  KEY_SECRET_JWT
} from "./config"
import {
  User
} from "./models";
import {
  handlerErrorMid,
  handlerErrorForbid
} from "./errorHandlers"
import methodOverride from "method-override"
import passport from "passport"
import delay from "express-delay"

const app = express()

const app_debug = new Debug('snv:app')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())
app.use(passport.initialize())
app.use(delay(3000))

// TODO:Make a directory including `utils` functions.
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
      expiresIn: '1d'
    }, cb_jwt(done))
  }))

// Verificate our token.
passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, KEY_SECRET_JWT, cb_jwt(done))
  }))

// @defined_routes
app.use('/api', pages)
app.use('/api/auth', auth)

// TODO: Make Middleware for successResponse.
app.use((req, res, next) => {
  app_debug(req.pre_response);
  res.status(201).json({
    magnolia: req.pre_response
  })
})

// TODO:Make a better handler, for catching errors.
app.use(handlerErrorMid)
app.use(handlerErrorForbid)

export default app
