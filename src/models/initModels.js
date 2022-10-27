const Users = require("./users.model")
const Types = require("./types.model")
const Recipes = require("./recipes.model")
const Categories = require("./categories.model")
const Ingredients = require("./ingredients.model")
const Instructions = require("./instructions.model")
const UsersRecipes = require("./usersRecipes.model")
const UsersIngredients = require("./usersIngredients.model")
const RecipesIngredients = require("./recipesIngredients.model")

const initModels = () => {
  Users.hasMany(Recipes)
  Users.hasMany(UsersRecipes)
  Users.hasMany(UsersIngredients)

  Types.hasMany(Ingredients)

  Recipes.hasMany(Users)
  Recipes.hasMany(UsersRecipes)
  Recipes.belongsTo(Categories)
  Recipes.belongsTo(Instructions)
  Recipes.belongsTo(RecipesIngredients)

  Categories.hasMany(Recipes)

  Ingredients.belongsTo(Types)
  Ingredients.belongsTo(UsersIngredients)
  Ingredients.belongsTo(RecipesIngredients)

  Instructions.belongsTo(Recipes)

  UsersRecipes.hasHook(Users)
  UsersRecipes.belongsTo(Recipes)

  UsersIngredients.belongsTo(Users)
  UsersIngredients.belongsTo(Ingredients)

  RecipesIngredients.belongsTo(Recipes)
  RecipesIngredients.hasMany(Ingredients)
}

module.exports = { initModels }