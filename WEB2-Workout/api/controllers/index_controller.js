const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workouts = mongoose.model('Workout')

module.exports.homePage = async function (req, res) {
    console.log(req.session.user)
    var user = await User.findOne({'_id': req.session.user._id})
    console.log(user)
    const workouts = await Workouts.find({'userId': user._id})
    console.log(workouts);
    res.render('index', {
        title: 'Hello ' + user.username,
        workouts
    });
};

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    console.log(id)
    await Workouts.deleteOne({_id: id}, function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.redirect('/');
}