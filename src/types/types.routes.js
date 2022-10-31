const router = require("express").Router()
const typeServices = require("./types.services")
const passport = require("passport")
const { adminValidate } = require("../middlewares/role.midelware")
require("../middlewares/auth.middleware")(passport)

router.route('/')
  .get(
    passport.authenticate('jwt', {session: false}),
    typeServices.getAllTypes
  )
  .post(
    passport.authenticate('jwt', {session: false}),
    adminValidate,
    typeServices.postType
  )

router.route('/:id')
  .get(
    passport.authenticate('jwt', {session: false}),
    typeServices.getTypeById
  )
  .delete(
    passport.authenticate('jwt', {session: false}),
    adminValidate,
    typeServices.deleteType
  )


module.exports = router