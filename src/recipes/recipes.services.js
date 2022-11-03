const controllers = require("./recipes.controllers")
const { sendError, sendResponse} = require("../utils/functions")

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await controllers.getAllRecipes()
    sendResponse(res, recipes)

  } catch (error) {
    sendError(res, error)
  }
}

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params, recipe = await controllers.getRecipeById(id)
    if(!recipe) return sendResponse(res, {message: 'Invalid id'}, 404)
    sendResponse(res, recipe)

  } catch (error) {
    sendError(res, error)
  }
}

const postRecipes = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { title, description, urlImg, time, portions, categoriId, origin } = req.body
    if(!title || !description || !time || !portions || !categoriId) return sendResponse(res, {
      message: 'Missing Data',
      fields: {
        title: 'string',
        description: 'string',
        time: 'number',
        portions: 'number',
        categoryId: 'number'
      }
    })
    const data = await controllers.createRecipes({title, description, urlImg, time, portions, categoriId, origin})
    sendResponse(res, data, 201)

  } catch (error) {
    sendError(res, error)
  }
}

const patchRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, urlImg, time, portions, categoriId, origin } = req.body
    const data = await controllers.updateRecipe(id, {title, description, urlImg, time, portions, categoriId, origin})
    if(!data[0]) return sendResponse(res, {message: 'Invalid id'})
    sendResponse(res, {message: 'Recipe edited succesfully'})

  } catch (error) {
    sendError(res, error)
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params, data = await controllers.deleteRecipe(id)
    if(!data) return sendResponse(res, {message: 'Invalid id'}, 404)
    sendResponse(res, {message: 'Recipe deleted succesfully'}, 204)

  } catch (error) {
    sendError(res, error)
  }
}


const getMyRecipes = async (req, res) => {
  try {
    const { id: userId } = req.user
    console.log('Id:', userId)
    const recipes = await controllers.getMyRecipes(userId)
    sendResponse(res, recipes)

  } catch (error) {
    sendError(res, error)
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  postRecipes,
  patchRecipe,
  deleteRecipe,
  getMyRecipes
}