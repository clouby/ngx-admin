import { AbilityBuilder } from "@casl/ability"

const createAbilityFor = user =>
    AbilityBuilder.define((allow, forbid) => {
     allow('create', 'User')
        if (user) {
            allow(['create', 'delete', 'update'], ['Post', 'Comment'], { author: user._id })
            allow(['read', 'update'], 'User', { _id: user._id })
        }
})

const DEFAULT = createAbilityFor(null)
const PERST = createAbilityFor(null)

export const generateAbilitiesPro = (req, res, next) => {
  req.ability = req.user.role ? createAbilityFor(req.user) : PERST
  return next(new Error('could not extend a parser.'))
}

export const generateAbilities = (req, res, next) => {
    req.ability = req.user._id ? createAbilityFor(req.user) : DEFAULT
    next()
}
