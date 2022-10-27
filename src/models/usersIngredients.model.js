const db = require("../utils/database")
const { DataTypes } = require("sequelize")
const Users = require("./users.model")
const Ingredients = require("./ingredients.model")

const UsersIngredients = db.define('users_ingredients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      key: 'id',
      model: Users
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


module.exports = UsersIngredients