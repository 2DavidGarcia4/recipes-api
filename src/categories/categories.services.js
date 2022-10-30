const categoriesControllers = require("./categories.controllers")
const { sendResponse, sendError } = require("../utils/functions")

const getAllCategories = async (req, res) => {
  try {
    const data = await categoriesControllers.getAllCategories()
    sendResponse(res, data)

  } catch (error) {
    sendError(res, error)
  }
}

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params, data = await categoriesControllers.getCategoryById(id) 
    if(!data) return sendResponse(res, {message: 'Invalid id'}, 404)
    sendResponse(res, data)

  } catch (error) {
    sendError(res, error)
  }
}

const postCategory = async (req, res) => {
  try {
    const { name } = req.body
    if(!name) sendResponse(res, {message: 'Invalid data', fields: {name: 'string'}}, 400) 
    const data = await categoriesControllers.createCategory(name)
    sendResponse(res, data, 201)

  } catch (error) {
    sendError(res, error)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params, data = await categoriesControllers.deleteCategory(id)
    if(!data) return sendResponse(res, {message: 'Invalid di'}, 404)
    sendResponse(res, data, 204)


  } catch (error) {
    sendError(res, error)
  }
}


module.exports = {
  getAllCategories,
  getCategoryById,
  postCategory,
  deleteCategory
}