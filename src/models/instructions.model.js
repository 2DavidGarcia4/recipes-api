const db = require("../utils/database")
const { DataTypes } = require("sequelize")
const Recipes = require("./recipes.model")

const Instructions = db.define('instructions', {
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
  step: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})


module.exports = Instructions