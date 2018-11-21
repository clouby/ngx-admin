import Debug from "debug"
import mongoose from "mongoose"
import app from "./app"
import {
  PORT,
  MONGO_URL
} from "./config"

// Include support native Promises
mongoose.Promise = global.Promise;

// Debug start main server
const server_main_debug = new Debug('snv:server')

async function start_server() {
  try {

    // Connect to Mongo Database
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true
    });

    // Run successfull
    server_main_debug('mongoose:connected.')

    // Last one, start the http sever
    app.listen(PORT, () => server_main_debug(`express_server:${PORT}`))

  } catch (error) {

    // If there are any error on mongo connection, do this...
    server_main_debug(`Upps!, ${JSON.stringify(error)}`);

    return process.exit(1);
  }
}

// @start_server public
start_server()
