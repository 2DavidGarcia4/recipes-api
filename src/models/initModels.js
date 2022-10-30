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

  Recipes.hasMany(UsersRecipes)
  Recipes.hasMany(RecipesIngredients)
  Recipes.hasMany(Instructions)
  Recipes.belongsTo(Users)
  Recipes.belongsTo(Categories)

  Categories.hasMany(Recipes)

  Ingredients.hasMany(UsersIngredients)
  Ingredients.hasMany(RecipesIngredients)
  Ingredients.belongsTo(Types)

  Instructions.belongsTo(Recipes)

  UsersRecipes.belongsTo(Users)
  UsersRecipes.belongsTo(Recipes)

  UsersIngredients.belongsTo(Users)
  UsersIngredients.belongsTo(Ingredients)

  RecipesIngredients.belongsTo(Recipes)
  RecipesIngredients.belongsTo(Ingredients)
}

module.exports = { initModels }