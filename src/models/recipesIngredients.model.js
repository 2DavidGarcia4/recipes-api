const db = require("../utils/database")
const { DataTypes } = require("sequelize")
const Recipes = require("./recipes.model")
const Ingredients = require("./ingredients.model")

const Types = db.define('types', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  recipesId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'recipes_id',
    references: {
      key: 'id',
      model: Recipes
    }
  },
  ingredientId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'ingredient_id',
    references: {
      key: 'id',
      model: Ingredients
    }
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  }
})


module.exports = Types