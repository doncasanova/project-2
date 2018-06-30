var index_api_controller = require('../controllers/index-api-controller');
var express = require('express');
var router = express.Router();

router.get('/api/tickets', index_api_controller.ticketsAll);

router.post('/api/tickets', index_api_controller.ticketCreate);

router.get('/api/tickets/:id', index_api_controller.ticketById);

router.put('/api/tickets', index_api_controller.ticketUpdate);

router.delete('/api/tickets/:id', index_api_controller.ticketDelete);

module.exports = router;