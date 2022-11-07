const { Sequelize } = require("sequelize")
const { db: { dbHost, password, dbName, userName } } = require("../config")

const db = new Sequelize({
  dialect: 'postgres',
  host: dbHost,
  username: userName, 
  password: password, 
  database: dbName,
  dialectOptions: process.env.NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
})

module.exports = db
