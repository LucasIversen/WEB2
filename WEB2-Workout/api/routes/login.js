var express = require('express');
var router = express.Router();
var passport = require('passport');
const loginController = require('../controllers/login_controller')

router.get('/', checkNotAuthenticated, loginController.loginPage);

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
      if (err) {
          console.log('Ups. Something broke!');
          res.redirect('/login')
      } else if (info) {
          console.log('unauthorized');
          res.redirect('/login')
      } else {
          req.login(user, function(err) {
            if (err) {
              console.log('Ups.');
              res.redirect('/login')
            } else {
              console.log('in post:\n' + user);
              req.session.user = user;
              res.redirect('/')
            }
          })
      }
  })(req, res, next);
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router;