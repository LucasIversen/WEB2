var express = require('express');
var router = express.Router();
const signupController = require('../controllers/signup_controller')

router.get('/', checkNotAuthenticated, signupController.signupPage);

router.post('/', checkNotAuthenticated, signupController.registerUser)


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}
  
module.exports = router;