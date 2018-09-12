import {
  AbilityBuilder
} from "@casl/ability"

const createAbilityFor = user =>
  AbilityBuilder.define(allow => {
    allow('create', 'User')
    if (user) {
      allow(['create', 'delete', 'update'], ['Post', 'Comment'], {
        author: user._id
      })
      allow(['read', 'update'], 'User', {
        _id: user._id
      })
    }
  })

const DEFAULT = createAbilityFor(null)

export const generateAbilities = (req, res, next) => {
  req.ability = req.user._id ? createAbilityFor(req.user) : DEFAULT
  next()
}
