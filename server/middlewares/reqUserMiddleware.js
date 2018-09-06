import jwt from "jsonwebtoken"
import Debug from "debug"

const debug = new Debug('snv:server:middleware')

exports.handlerExcludeRoutes = (routes = []) => (req, res, next) => {
    const there_some = routes.some(route => route === req.path)
        if(there_some) return next('route')
    return next()
}

exports.decodeToken = (req, res, next) => {
    debug(req.path)
    const { email, _id, nickname } = jwt.decode(req.user)
    req.user = Object.assign({}, {
        _id,
        email,
        nickname,
        token:req.user
    })
    return next()
}
