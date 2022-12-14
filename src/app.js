const express = require("express")
const cosrs = require("cors")
const { port } = require("./config")
const { uuidGenerator } = require("./utils/functions")

const usersRoutes = require("./users/users.routes")
const authRouters = require("./auth/auth.routes")
const categoriesRouters = require("./categories/categories.routes")
const typesRouters = require("./types/types.routes")
const recipesRouters = require("./recipes/recipes.routes")
const ingredientsRouters = require("./ingredients/ingredients.routes")
const instructionsRouters = require("./instructions/instructions.routes")

const db = require("./utils/database")
const { initModels } = require("./models/initModels")
console.log(uuidGenerator())

const app = express(), prefix = '/api/v1/'

app.use(express.json())
app.use(cosrs())
app.use(prefix+'users', usersRoutes)
app.use(prefix+'auth', authRouters)
app.use(prefix+'categories', categoriesRouters)
app.use(prefix+'types', typesRouters)
app.use(prefix+'recipes', recipesRouters)
app.use(prefix+'ingredients', ingredientsRouters)
app.use(prefix+'instructions', instructionsRouters)


db.authenticate()
.then(()=> console.log('DB autenticated'))
.catch(err=> console.log(err))

db.sync()
.then(()=> console.log('DB synced'))
.catch(err=> console.log(err))
initModels()

app.get(prefix, (req, res) => {
  res.status(200).send({
    message: 'ok',
    users: `http://localhost:${port}${prefix}users`
  })
})


app.listen(port, () => {
  console.log('server is runing in port:', port)
})