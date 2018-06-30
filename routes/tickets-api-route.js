var tickets_api_controller = require('../controllers/tickets-api-controller');
var express = require('express');
var router = express.Router();

router.get('/api/tickets', tickets_api_controller.ticketsAll);

router.post('/api/tickets', tickets_api_controller.ticketCreate);

router.get('/api/tickets/:id', tickets_api_controller.ticketById);

router.put('/api/tickets', tickets_api_controller.ticketUpdate);

router.delete('/api/tickets/:id', tickets_api_controller.ticketDelete);

module.exports = router;