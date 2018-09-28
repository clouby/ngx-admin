import {
  User,
  Post
} from "../models"

exports.logIn = async (req, res, _) => res.status(200).json(Object.assign({}, req.user))

exports.signUp = async (req, res) => {
  const pre_user = new User(Object.assign({}, req.body))
  //req.ability.throwUnlessCan('create', pre_post)
  const user = await pre_user.save()

  const {
    nickname,
    email,
    role,
    _id
  } = user

  return res
    .status(201)
    .json({
      nickname,
      email,
      role,
      _id
    })
}

exports.releasePosts = async (req, res) => {
  const posts = await Post
    .accessibleBy(req.ability)
    .populate('author')

  return res
    .status(200)
    .json({
      posts
    })
}

exports.updateUser = async (req, res) => {
  const {
    id: _id
  } = req.params
  const user = await User.findOneAndUpdate({
    _id
  }, Object.assign({}, req.body), {
    new: true
  })

  return res
    .status(200)
    .json({
      user
    })
}
