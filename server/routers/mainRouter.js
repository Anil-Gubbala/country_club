const express = require('express')
const { getLogin, registerUser, logout, setLogin, getMembershipTypes } = require('../controllers/mainController')
const { createEvent, getEvents, readEvent, getVenue, updateEvent, deleteEvent, getuserEvents, updateUserEvents } = require('../controllers/eventsController')
const { createVenue, getVenueDetails, readVenue, getVenueType, updateVenue, deleteVenue } = require('../controllers/venueController')
const router = express.Router()

const { partyGetVenues, partyInsert, partyGetBookings, cancelParty } = require('../controllers/partyController')
const { getPendingUsers, getUsers, getUsersById, approvePendingUser, deleteUser, updateUser, createNewAdmin, getAdminList } = require('../controllers/adminController')
const { getAllSports, getBookingSlot, sportsBookingInsert, cancelSportsBooking, getSportsHistory, postBookiongStatus } = require('../controllers/sportsController')


router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
router.route('/getMembershipTypes').get(getMembershipTypes)
    //router.route('/')


router.route('/admin/users/list').get(getUsers)
router.route('/admin/users/details/:id').get(getUsersById)
router.route('/admin/users/pending').get(getPendingUsers)
router.route('/admin/users/activate').post(approvePendingUser)
router.route('/admin/users/delete').post(deleteUser)
router.route('/admin/users/update').post(updateUser)
router.route('/admin/newadmin/create').post(createNewAdmin)
router.route('/admin/users/adminuser').get(getAdminList)

router.route('/admin').get(getEvents)
router.route('/admin/events/create').get(getVenue).post(createEvent)
router.route('/admin/events/details/:id').get(readEvent)
router.route('/admin/events/update').post(updateEvent)
router.route('/admin/events/delete').post(deleteEvent)

router.route('/admin/venuelist').get(getVenueDetails)
router.route('/admin/venue/create').post(createVenue)
router.route('/admin/venue/details/:id').get(readVenue)
router.route('/admin/venue/update').post(updateVenue)
router.route('/admin/venue/delete').post(deleteVenue)


router.route('/user/partyGetVenues').get(partyGetVenues)
router.route('/user/partyInsert').post(partyInsert)
router.route('/user/partyGetBookings').get(partyGetBookings)
router.route('/user/cancelParty').post(cancelParty)

router.route('/user/getAllSports').get(getAllSports)
router.route('/user/getBookingSlot').get(getBookingSlot)
router.route('/user/sportsBookingInsert').post(sportsBookingInsert)
router.route('/user/cancelSportsBooking').post(cancelSportsBooking)
router.route('/user/getSportsHistory').get(getSportsHistory)
router.route('/user/bookingSlot').post(postBookiongStatus)

router.route('/user/getEvents').get(getuserEvents)
router.route('/user/updateEvents').post(updateUserEvents)

module.exports = router