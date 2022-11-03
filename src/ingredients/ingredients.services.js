const { sendResponse, sendError } = require('../utils/functions')
const ingredientControllers = require('./ingredients.controllers')

const getAllIngredients = (req, res) => {
  ingredientControllers.getAllIngredients()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const getIngredientById = (req, res) => {
  const id = req.params.ingredientId
  ingredientControllers.getIngredientById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postIngredient = (req, res) => {
  const { name, typeId, urlImg } = req.body

  if (name && typeId) {
    ingredientControllers.createIngredient({
      name, typeId, urlImg
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({
      message: 'Missing Data',
      fields: {
        name: 'string',
        typeId: 'number',
        urlImg: 'string'
      }
    })
  }
}


const patchIngredient = (req, res) => {
  const { name, typeId, urlImg } = req.body
  const id = req.params.ingredientId
  ingredientControllers.updateIngredient(id, { name, typeId, urlImg })
    .then(data => {
      if (data[0]) {
        res.status(200).json({ message: `Ingredient with ID: ${id} edited succesfully` })
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const deleteIngredient = (req, res) => {
  const id = req.params.ingredientId

  ingredientControllers.deleteIngredient(id)
    .then(data => {
      if (data) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postIngredientToUser = async (req, res) => {
  try {
    const { id: userId } = req.user, { ingredientId } = req.params, { amount } = req.body
    if(!amount) return sendResponse(res, {message: 'Missing data', fields: {amount: 'string'}}, 404)
    const data = await ingredientControllers.addIngredientToUser({userId, ingredientId, amount})
    sendResponse(res, data)

  } catch (error) {
    sendError(res, error)
  }
}

module.exports = {
  getAllIngredients,
  getIngredientById,
  postIngredient,
  patchIngredient,
  deleteIngredient,
  postIngredientToUser
}