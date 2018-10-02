import Debug from "debug"
import mongoose from "mongoose"
import app from "./app"
import {
  PORT,
  MONGO_URL
} from "./config"

mongoose.Promise = global.Promise

const server_main_debug = new Debug('snv:server')

async function start_server() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true
    })
  } catch (error) {
    server_main_debug(`Upps!, ${JSON.stringify(error)}`);
    process.exit(1);
  }
  server_main_debug('mongoose:connected.')

  app.listen(PORT, () => server_main_debug(`express_server:${PORT}`))
}

// @start_server public
start_server()
