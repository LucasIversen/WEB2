var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index_controller')

router.get('/', checkAuthenticated, indexController.homePage);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}

module.exports = router;
