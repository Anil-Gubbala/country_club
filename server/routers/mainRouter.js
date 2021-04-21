const express = require('express')
const { getLogin, registerUser, logout, setLogin } = require('../controllers/mainController')
const { createEvent, getEvents } = require('../controllers/eventsController')
const router = express.Router()
const {partyGetVenues} = require('../controllers/partyController')

router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
//router.route('/')
router.route('/admin').get(getEvents)
router.route('/admin/events/create').post(createEvent)
router.route('/user/partyGetVenues').get(partyGetVenues)



module.exports = router