const router = require("express").Router()
const service = require("./users.services")
const recipesServices = require("../recipes/recipes.services")
const passport = require("passport")
const { adminValidate } = require("../middlewares/role.midelware")
require("../middlewares/auth.middleware")(passport)

router.get('/', passport.authenticate('jwt', {session: false}), service.getAllUsers)

router.route('/me')
.get(passport.authenticate('jwt', {session: false}), service.getMyUser)
.patch(passport.authenticate('jwt', {session: false}), service.patchMyUser)
.delete(passport.authenticate('jwt', {session: false}), service.deleteMyUser)

router.get('/me/recipes',
  passport.authenticate('jwt', {session: false}),
  recipesServices.getMyRecipes
)

router.route('/:id')
.get(
  passport.authenticate('jwt', {session: false}),
  adminValidate,
  service.getUserById
)
.patch(
  passport.authenticate('jwt', {session: false}), 
  adminValidate,
  service.patchUser
)
.delete(
  passport.authenticate('jwt', {session: false}),
  adminValidate,
  service.deleteUser
)


module.exports = router