const db = require("../utils/database")
const { DataTypes } = require("sequelize")
const Types = require("./types.model")

const Ingredients = db.define('ingredients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_id',
    references: {
      key: 'id',
      model: Types,
    },
  },
  urlImg: {
    type: DataTypes.STRING,
    field: 'url_img',
    validate: {
      isUrl: true
    }
  }
}, {
  timestamps: false
})


module.exports = Ingredients