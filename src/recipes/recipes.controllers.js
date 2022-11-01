const Recipes = require("../models/recipes.model")
const { uuidGenerator } = require("../utils/functions")

const getAllRecipes = () => Recipes.findAll()

const getRecipeById = (id) => Recipes.findOne({where: {id}})

const createRecipes = (data) => Recipes.create({
  id: uuidGenerator(),
  ...data
})

const updateRecipe = (id, data) => Recipes.update(data, {where: {id}})

const deleteRecipe = (id) => Recipes.update({where: {id}})

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipes,
  updateRecipe,
  deleteRecipe
}