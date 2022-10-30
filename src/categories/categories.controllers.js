const Categories = require("../models/categories.model")

const getAllCategories = () => Categories.findAll()

const getCategoryById = (id) => Categories.findOne({where: {id}})

const createCategory = (name) => Categories.create({name})

const deleteCategory = (id) => Categories.destroy({where: {id}})


module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory
}