const express = require('express')
const api = express.Router()

const registrationController = require('../controllers/registrationController')


api.post('/register', registrationController.register)

module.exports = api