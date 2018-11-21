// Select enviroment for (local/remote) - Mongo Database
const DATABASE_NAME = 'db_sennova';
const get_path = process.env.MONGO_PATH;

// Load local path.
const mongodb_path = {
  env: 'mongo_path',
  local: `mongodb://localhost:27017/${DATABASE_NAME}`,
  remote: `mongodb://clouby:carlos25@ds141812.mlab.com:41812/${DATABASE_NAME}`,
}

// Load all global variables.
export const MONGO_URL = typeof (get_path) === 'string' && mongodb_path[get_path] ? mongodb_path[get_path] : mongodb_path.local;
export const PORT = 4000
export const TOKEN_KEY = 'sennova:mangement'
export const SALT_ROUND = 10
export const KEY_SECRET_JWT = "sennova_l1br3$"
