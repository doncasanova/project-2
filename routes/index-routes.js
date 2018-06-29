var index_controller = require('../controllers/index_controller');

module.exports = function(app) {

  app.get('/', (req, res) => index_controller.index);


}