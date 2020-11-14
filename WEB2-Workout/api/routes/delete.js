var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index_controller')

router.get('/:id', checkAuthenticated, indexController.delete)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}

module.exports = router;