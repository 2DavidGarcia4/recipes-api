const router = require("express").Router()
const services = require("./recipes.services")
const passport = require("passport")
const { adminValidate } = require("../middlewares/role.midelware")
require("../middlewares/auth.middleware")(passport)

router.route('/')
  .get(
    services.getAllRecipes
  )
  .post(
    passport.authenticate('jwt', {session: false}),
    services.postRecipes
  )

router.route('/:id')
  .get(
    services.getRecipeById
  )
  .patch(
    passport.authenticate('jwt', {session: false}),
    services.patchRecipe
  )
  .delete(
    passport.authenticate('jwt', {session: false}),
    services.deleteRecipe
  )

module.exports = router