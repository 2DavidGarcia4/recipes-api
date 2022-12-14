const { uuidGenerator } = require("../utils/functions")

const Ingredients = require('../models/ingredients.model')
const UsersIngredients = require("../models/usersIngredients.model")

const getAllIngredients = async () => {
  const data = await Ingredients.findAll()
  return data
}

const getIngredientById = async (id) => {
  const data = await Ingredients.findOne({
    where: {
      id
    }
  })
  return data
}

const createIngredient = async (data) => {
  const response = await Ingredients.create({
    id: uuidGenerator,
    name: data.name,
    typeId: data.typeId,
    urlImg: data.urlImg
  })
  return response
}

const updateIngredient = async (id, data) => {
  const response = await Ingredients.update(data, {
    where: {
      id
    }
  })
  return response
}

const deleteIngredient = async (id) => {
  const data = await Ingredients.destroy({
    where: {
      id
    }
  })
  return data
}

const addIngredientToUser = (data) => UsersIngredients.create({
  id: uuidGenerator(),
  ...data
})


module.exports = {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  addIngredientToUser
}