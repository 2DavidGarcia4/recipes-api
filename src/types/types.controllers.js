const Types = require("../models/types.model")

const getAllTypes = () => Types.findAll()

const getTypeById = (id) => Types.findOne({where: {id}})

const createType = (name) => Types.create({name})

const deleteType = (id) => Types.destroy({where: {id}})


module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  deleteType
}