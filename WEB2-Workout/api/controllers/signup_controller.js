const mongoose = require('mongoose')
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

module.exports.signupPage = function (req, res) {
    res.render('signup', {
        title: 'Signup'
    });
}

module.exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        console.log('signup called')
        console.log(newUser);
        res.redirect('/login')
    } catch {
        res.redirect('/signup')
    }
}
