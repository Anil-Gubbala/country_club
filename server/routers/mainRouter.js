const express = require('express')
const { getLogin, registerUser, logout, setLogin, getMembershipTypes } = require('../controllers/mainController')
const { createEvent, getEvents, readEvent, getVenue, updateEvent} = require('../controllers/eventsController')
const router = express.Router()
const {partyGetVenues, partyInsert,partyGetBookings, cancelParty} = require('../controllers/partyController')
const { getPendingUsers, getUsers, getUsersById, approvePendingUser, deleteUser, createNewAdmin } = require('../controllers/adminController')


router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
router.route('/getMembershipTypes').get(getMembershipTypes)
//router.route('/')


router.route('/admin/users').get(getUsers)
router.route('/admin/pendingusers').get(getPendingUsers)
router.route('admin/approvependinguser/:id').post(approvePendingUser)
router.route('admin/deleteuser/:id').delete(deleteUser)
router.route('admin/createnewadmin').post(createNewAdmin)

router.route('/admin').get(getEvents)
router.route('/admin/events/create').get(getVenue).post(createEvent)
router.route('/admin/events/details/:id').get(readEvent)
router.route('/admin/events/update').post(updateEvent)
router.route('/admin/users/details/:id').get(getUsersById)

router.route('/user/partyGetVenues').get(partyGetVenues)
router.route('/user/partyInsert').post(partyInsert)
router.route('/user/partyGetBookings').get(partyGetBookings)
router.route('/user/cancelParty').post(cancelParty)




module.exports = router