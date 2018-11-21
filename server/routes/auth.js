import {
  Router
} from "express"
import passport from "passport"
import authController from "../controllers/authController"
import {
  decodeToken,
} from "../middlewares"
import {
  handlerErrorAct
} from "../errorHandlers"

// Initialize route object.
const route = Router()

// Include routes for authentication and sign up.
route.post('/login', passport.authenticate('local', {
    session: false
  }),
  decodeToken, handlerErrorAct(authController.logIn))

route.post('/signup', handlerErrorAct(authController.signUp))

route.post('/signup/:id', handlerErrorAct(authController.updateUser))

export default route;
