const { hashSync, compare } = require("bcrypt")

const uuidGenerator = () => {
  const uuid = []
  uuid[8] = '-', uuid[13] = '-', uuid[18] = '-', uuid[23] = '-'

  for(let i=0; i<36; i++){
    if(!uuid[i]){
      uuid[i] = Math.floor(Math.random()*16).toString(18)
    }
  }
  return uuid.join('')
}

const sendResponse = (res, data, status = 200) => res.status(status).json(data)

const sendError = (res, {message}, status = 400) => res.status(status).json({message})

const hashPassword = (plainPassword) => hashSync(plainPassword, 10)

const comparePassword = (plainPassword, hashPassword) => compare(plainPassword, hashPassword)

module.exports = { 
  uuidGenerator,
  sendResponse,
  sendError, 
  hashPassword, 
  comparePassword 
}