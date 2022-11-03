const { Op } = require("sequelize")
const Recipes = require("../models/recipes.model")
const { uuidGenerator } = require("../utils/functions")

const Users = require("../models/users.model")
const Types = require("../models/types.model")
const Categories = require("../models/categories.model")
const Ingredients = require("../models/ingredients.model")
const Instructions = require("../models/instructions.model")
const UsersIngredients = require("../models/usersIngredients.model")
const RecipesIngredients = require("../models/recipesIngredients.model")


const getAllRecipes = () => Recipes.findAll({
  attributes: {
    exclude: ['userId', 'categoryId', 'createdAt', 'updatedAt']
  },
  include: [
    {
      model: Categories,
    },
    {
      model: Users,
      attributes: ['id', 'firstName', 'lastName']
    },
    {
      model: Instructions,
      attributes: ['step', 'description']
    },
    {
      model: RecipesIngredients,
      attributes: {
        exclude: ['ingredientId', 'recipeId', 'createdAt', 'updatedAt']
      },
      include: {
        model: Ingredients,
        attributes: {
          exclude: ['typeId']
        },
        include: {
          model: Types
        }
      }
    }
  ]
})

const getRecipeById = (id) => Recipes.findOne({
  where: {id},
  attributes: {
    exclude: ['userId', 'categoryId', 'createdAt', 'updatedAt']
  },
  include: [
    {
      model: Categories,
    },
    {
      model: Users,
      attributes: ['id', 'firstName', 'lastName']
    },
    {
      model: Instructions,
      attributes: ['step', 'description']
    },
    {
      model: RecipesIngredients,
      attributes: {
        exclude: ['ingredientId', 'recipeId', 'createdAt', 'updatedAt']
      },
      include: {
        model: Ingredients,
        attributes: {
          exclude: ['typeId']
        },
        include: {
          model: Types
        }
      }
    }
  ]
})

const createRecipes = (data) => Recipes.create({
  id: uuidGenerator(),
  ...data
})

const updateRecipe = (id, data) => Recipes.update(data, {where: {id}})

const deleteRecipe = (id) => Recipes.update({where: {id}})

const getMyRecipes = async (userId) => {
  const userIngredients = await UsersIngredients.findAll({
    where: {userId},
    attributes: ['ingredientId']
  })
  
  const recipeIngredients = await RecipesIngredients.findAll({
    where: {
      ingredientId: {
        [Op.in]: userIngredients.map(m=> m.ingredientId) 
      }
    }
  })

  return await Recipes.findAll({
    where: {
      id: {
        [Op.in]: recipeIngredients.map(m=> m.recipeId)
      }
    }
  })
}


module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipes,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
}