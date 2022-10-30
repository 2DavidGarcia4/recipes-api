const router = require("express").Router()
const categoriesServices = require("./categories.services")
const passport = require("passport")
const { adminValidate } = require("../middlewares/role.midelware")
require("../middlewares/auth.middleware")(passport)

router.route('/')
  .get(
    passport.authenticate('jwt', {session: false}),
    categoriesServices.getAllCategories
  )
  .post(
    passport.authenticate('jwt', {session: false}),
    adminValidate,
    categoriesServices.postCategory
  )

router.route('/:id')
.get(
  passport.authenticate('jwt', {session: false}),
  categoriesServices.getCategoryById
)
.delete(
  passport.authenticate('jwt', {session: false}),
  adminValidate,
  categoriesServices.deleteCategory
)

module.exports = router