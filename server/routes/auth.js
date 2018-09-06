import { Router } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import Debug from "debug"
import { Strategy as BearerStrategy } from "passport-http-bearer"
import { Strategy as LocalStrategy } from "passport-local"
import authController from "../controllers/authController"
import { decodeToken, generateAbilities } from "../middlewares"
import { User } from "../models"
import { KEY_SECRET_JWT } from "../config"
import { handlerErrorAct } from "../errorHandlers"

const route = Router()

const debug = new Debug('snv:server:auth')

const response_error_message = field => ({
    message: `${field.toUpperCase()} is not correct.`
})

const cb_jwt = done => (err, val) => {
    if(err) return done(err)
    done(null, val)
}

passport.use(
    new LocalStrategy( {
        usernameField: 'email',
        session: false
    }, async (email, password, done) => {
        const user = await User.findOne({ email }).select('+password')

        if (!user) return done( response_error_message('email') )

        if(!(await user.verifyPassword(password))) return done( response_error_message('password') )

        const { email:email_user, _id, nickname } = user

    jwt.sign({ nickname, email: email_user, _id }, KEY_SECRET_JWT, { expiresIn: '1h' }, cb_jwt(done))
}))

passport.use(
    new BearerStrategy((token, done) => {
        jwt.verify(token, KEY_SECRET_JWT, cb_jwt(done))
}))

route.all('*', (req, res, next) => {
    const routes_excluded = ['/login', '/signup']
    if (routes_excluded.includes(req.path)) return next('route')
    else next()
}, passport.authenticate('bearer', { session: false }), generateAbilities)


route.post('/login', passport.authenticate('local', { session: false }),
            decodeToken, handlerErrorAct(authController.logIn))

// @include signup#handlers
route.post('/signup', handlerErrorAct(authController.signUp))
route.post('/signup/:id', handlerErrorAct(authController.updateUser))

export default route
