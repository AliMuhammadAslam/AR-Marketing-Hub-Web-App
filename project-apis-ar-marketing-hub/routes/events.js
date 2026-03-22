const express = require('express')
const router = express.Router()
const eventController = require('../controllers/Event');
const userController = require('../controllers/User');

router.get('/events', eventController.getEvents);
router.post("/find_event/:event_name", eventController.findEvents);
router.get("/event_details/:event_id", eventController.getEventDetails);
router.post("/add_event", eventController.postAddNewEvent);
router.post("/update_event/:event_id", eventController.postUpdateEvent);
router.get("/delete_event/:event_id", eventController.getDeleteEvent);
router.post("/add_ticket", eventController.postAddNewTicket);
router.post("/event_details/:user_id/:event_id/comment", userController.postNewEventComment);

module.exports = router;
