const mongoose = require('mongoose')
const User = mongoose.model('User');
var passport = require('passport')

module.exports.loginPage = function (req, res) {
    res.render('login', {
        title: 'Login',
        email: req.body.email,
        password: req.body.password
    });
}
