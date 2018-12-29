// Import the credentials for Google API - OAuth2
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
} from "../config";
import {
  Token
} from "../models";
import {
  google
} from "googleapis";

const OAuth2 = google.auth.OAuth2;

// Main object that handle the token with the Google API
export const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL);


// Get actual tokens from Google API
export async function getTokens() {
  try {
    // There is a refresh_token updated ?
    const {
      refresh_token
    } = await Token.findOne({
      provider: 'gmail'
    });

    // Set the new refresh token 
    oauth2Client.setCredentials({
      refresh_token
    });

    // Get the access token
    const {
      token: access_token
    } = await oauth2Client.getAccessToken();

    return {
      access_token,
      refresh_token,
    }
  } catch (error) {
    console.log("ERROR:GOOGLEAPI", error);
  }
}

// When the refresh_token has changed, save it!
oauth2Client.on('tokens', async ({
  refresh_token,
  access_token
}) => {
  refresh_token && await Token.findOneAndUpdate({
    provider: 'gmail'
  }, {
    refresh_token
  })

  console.log(access_token);
})
