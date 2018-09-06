import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import { auth } from "./routes"
import { handlerErrorMid, handlerErrorForbid } from "./errorHandlers"
import methodOverride from "method-override"
import passport from "passport"
import delay from "express-delay";

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())
app.use(passport.initialize())
app.use( delay(3000) )
	

// @defined_routes
app.use('/api/auth', auth)

// TODO:Make a better handler, for catching errors
app.use(handlerErrorMid)
app.use(handlerErrorForbid)

export default app
