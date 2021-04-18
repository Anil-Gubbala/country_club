const express = require('express')
const { getLogin, registerUser, logout, setLogin } = require('../controllers/mainController')
const { createEvent } = require('../controllers/eventsController')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
//router.route('/')
router.route('/admin')
router.route('/admin/events/create').post(createEvent)


module.exports = router