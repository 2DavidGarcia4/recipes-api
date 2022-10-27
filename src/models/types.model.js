const db = require("../utils/database")
const { DataTypes } = require("sequelize")
const Ingredients = require("./ingredients.model")

const Typess = db.define('types', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    references: {
      key: 'id',
      model: Ingredients
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})


module.exports = Typess