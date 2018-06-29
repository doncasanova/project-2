var index_controller = require('../controllers/index-controller');

module.exports = function(app) {

  app.get('/', (req, res) => index_controller.index);


}