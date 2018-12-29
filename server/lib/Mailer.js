import nodemailer from "nodemailer";
import inLineCss from "nodemailer-juice";
import {
  oauth2Client,
  getTokens
} from "./GoogleAPIProvider";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from "../config";

const EMAIL_FROM = "celb25@gmail.com";

const TEMPLATES = {
  "reset": `
        <style>
            div {
               background-color: #3d3780;
               padding: 20px;
               display: block;
               width: 70%;
               color: #d1d1ff;
               margin: 2rem auto;
               border-radius: 10px;
               text-align: center;
               box-shadow: 0px 4px 50px grey !important;
            }

           div p a {
                color: #8b72ff;
                text-decoration: none;
                font-weight: 400;
                border-bottom: 1px dashed #8b72ff;
            }
        </style>
        <div>
            <h3 style="font-size: 1.5rem;color:whitesmoke;">
                Resetear su contraseña*
            </h3>

            <p>
                Acaba de ingresar a una nueva configuracion externa de su contraseña, presione <a href=http://localhost:4200/#/pages/ui-features/typography">aquí</a>
            </p>

            <div style="background-color:#2f296b;color:#26df8b;border:none;">
                Esta verificacion sera valida hasta: <strong>20/12/2018:200</strong>
            </div>
        </div>
    `
}

const DEFAULT_MAIL_OPTION = {
  from: EMAIL_FROM,
  subject: "Restablecer contraseña - SENNP.📇",
  generateTextFromHTML: true,
  html: TEMPLATES.reset,
};

export async function sendMail(mailOptions = {}, key_template) {
  try {
    const {
      access_token: accessToken,
      refresh_token: refreshToken
    } = await getTokens();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: EMAIL_FROM,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken,
        accessToken,
      }
    });

    transport.use('compile', inLineCss());

    return new Promise((resolve, reject) => {
      transport.sendMail(Object.assign({}, DEFAULT_MAIL_OPTION, mailOptions, {
        html: TEMPLATES[key_template],
      }), (err, info) => {
        err ? reject(erro) : resolve(info);
        transport.close();
      })
    })

  } catch (error) {
    console.log("ERROR:MAILER", error);
  }
}
