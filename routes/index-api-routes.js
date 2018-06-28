var index_api_controller = require('../controller/index_controller');

module.exports = function(app) {
  
  app.get('/api/tickets', index_api_controller.ticketsAll );

  app.post('/api/tickets', index_api_controller.ticketCreate);

  app.get('/api/tickets/:id', index_api_controller.ticketById);

  app.put('/api/tickets', index_api_controller.ticketUpdate);
  
  app.Delete('/api/tickets/:id', index_api_controller.ticketDelete);
}