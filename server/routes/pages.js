import {
  Router
} from "express"
import passport from "passport"
import {
  generateAbilities
} from "./../middlewares"
import {
  handlerErrorAct
} from "./../errorHandlers"
import LResearchController from "./../controllers/LResearchController"
import {
  hotbedRoutes
} from "./_pages"

const route = Router()

// Handler for exclude routes on ACL/JWT_Verification / excluding /auth/ paths
route.all(/^((?!auth).)*$/, passport.authenticate('bearer', {
  session: false
}), generateAbilities)


// Include routes for all the pages.
route.use('/hotbed', hotbedRoutes)

// @Global_Routes
route.get('/lines', handlerErrorAct(LResearchController.all))
route.post('/line-reseach/create', handlerErrorAct(LResearchController.store))

export default route
