const typesControllers = require("./types.controllers")
const { sendResponse, sendError } = require("../utils/functions")


const getAllTypes = async (req, res) => {
  try {
    const types = await typesControllers.getAllTypes()
    sendResponse(res, types)

  } catch (error) {
    sendError(res, error)
  }
}

const getTypeById = async (req, res) => {
  try {
    const { id } = req.params, type = await typesControllers.getTypeById(id)
    if(!type) return sendResponse(res, {message: 'Invalid id'}, 404)
    sendResponse(res, type)

  } catch (error) {
    sendError(res, error)
  }
}

const postType = async (req, res) => {
  try {
    const { name } = req.body
    if(!name) return sendResponse(res, {message: 'Invalid data', fields: {name: 'string'}}, 404)
    const data = await typesControllers.createType(name)
    sendResponse(res, data)

  } catch (error) {
    sendError(res, error)
  }
}

const deleteType = async (req, res) => {
  try {
    const { id } = req.params, data = await typesControllers.deleteType(id)
    if(!data) return sendResponse(res, {message: 'Invalid id'}, 404)
    sendResponse(res, data)

  } catch (error) {
    sendError(res, error)
  }
}

module.exports = {
  getAllTypes,
  getTypeById,
  postType,
  deleteType
}