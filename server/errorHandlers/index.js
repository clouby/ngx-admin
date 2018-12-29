import chalk from "chalk"
import Debug from "debug"
import {
  ForbiddenError,
} from "@casl/ability"

const debug = new Debug('snv:server:error')

export const handlerErrorMid = (error, req, res, next) => {
  //  If there is an error about Ability, send it to handlerErrorForbid
  if (error instanceof ForbiddenError) {
    return next(error)
  }
  debug(chalk.red("[error_mid_handler]") + " " + JSON.stringify(error))
  res
    .status(500)
    .json({
      error
    })
}

export const handlerErrorForbid = (error, req, res, next) => {
  debug(chalk.bgMagenta("[error_ability_handler]") + " " + JSON.stringify(error))
  res
    .status(500)
    .json({
      error
    })
}

export const handlerErrorAct = fn => (req, res, next) => fn(req, res, next).catch(next)
