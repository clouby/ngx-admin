import Debug from "debug"
import mongoose from "mongoose"
import app from "./app"
import { PORT, MONGO_URL } from "./config"

mongoose.Promise = global.Promise

const server_main_debug = new Debug('snv:server')

async function start_server() {
    await mongoose.connect( MONGO_URL, { useNewUrlParser: true } )
    server_main_debug('mongoose:connected.')
    app.listen( PORT, () => server_main_debug(`express_server:${PORT}`))
}

// @start_server public
    start_server()