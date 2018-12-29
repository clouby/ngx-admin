import {
  Router
} from "express";
import passport from "passport";
import authController from "../controllers/authController";
import {
  decodeToken,
} from "../middlewares";
import {
  handlerErrorAct
} from "../errorHandlers";
import {
  sendMail
} from "../lib/Mailer";


// Initialize route object.
const route = Router()

// Include routes for authentication and sign up.
route.post('/login', passport.authenticate('local', {
    session: false
  }),
  decodeToken, handlerErrorAct(authController.logIn))

route.post('/signup', handlerErrorAct(authController.signUp))

route.post('/signup/:id', handlerErrorAct(authController.updateUser))

// FIXME: Testing `nodemailer`
route.get('/test-email', async (req, res) => {

  const result = await sendMail({
    subject: "Tengo calicha",
    to: "karina.madera@hotmail.com",
  }, "reset");

  console.log("RESULT", result);

  res.send('END!');
});

route.post('/reset-password', (req, res) => {
  console.log(req.body);
  res.json({
    data: 'carlos_magnolio',
    redirect: '/magnolia'
  })
})

export default route;
