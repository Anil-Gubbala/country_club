const express = require('express')
const { getLogin, registerUser, logout, setLogin } = require('../controllers/mainController')
const { createEvent, getEvents, readEvent, getVenue} = require('../controllers/eventsController')
const router = express.Router()
const {partyGetVenues, partyInsert,partyGetBookings} = require('../controllers/partyController')
const { getPendingUsers, getUsers, getUsersById, approvePendingUser } = require('../controllers/adminController')

router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
//router.route('/')
router.route('/admin/users').get(getUsers)
router.route('/admin/pendingusers').get(getPendingUsers)
router.route('admin/approvependinguser').post(approvePendingUser)

router.route('/admin').get(getEvents)
router.route('/admin/events/create').get(getVenue).post(createEvent)
router.route('/admin/events/details/:id').get(readEvent)
router.route('/admin/users/details/:id').get(getUsersById)

router.route('/user/partyGetVenues').get(partyGetVenues)
router.route('/user/partyInsert').post(partyInsert)
router.route('/user/partyGetBookings').get(partyGetBookings)




module.exports = router