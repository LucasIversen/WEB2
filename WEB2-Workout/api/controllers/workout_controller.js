const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workouts = mongoose.model('Workout')
const Sets = mongoose.model('Set')

module.exports.addWorkoutForm = function (req, res) {
    res.render('workout-add', {
        title: 'workout-add'
    });
};

module.exports.addWorkout = async function (req, res) {
    try {
        var user = await User.findOne({'_id': req.session.user._id})
        var workout = await Workouts.create({
            workoutName: req.body.name,
            userId: user._id,
            sets: []
        })
        console.log('new workout is:')
        console.log(workout);
        res.redirect('/')
    }
    catch (e) {
        console.log(e)
        res.redirect('/workout/add')
    }
};

module.exports.WorkoutInfoForm = async function (req, res) {
    var id = req.params.id;
    console.log(id)
    const workout = await Workouts.findOne({_id: id}, function(err) {
        if (err) {
            console.log(err);
        }
    })
    var sets = await Sets.find({workoutId: id}, function(err) {
        if (err) {
            console.log(err);
        }
    })
    console.log(sets);
    res.render('workout-info', {
        title: workout.workoutName,
        sets,
        workout
    });
}

module.exports.addSet = async function (req, res) {
    var id = req.params.id;
    try {
        const newSet = await Sets.create({
            setName: req.body.setName,
            Description: req.body.Description,
            setsTime: req.body.setsTime,
            repetetions: req.body.repetetions,
            workoutId: id
        })
        console.log('set created')
        console.log(newSet);
    } catch (err) {
        console.log(err)
    }
    res.redirect(id)
}

module.exports.deleteSet = async function (req, res) {
    var id = req.params.id;
    var set = await Sets.findOne({_id: id}, function(err) {
        if (err) {
            console.log(err);
        }
    })
    console.log(set);
    var workoutId = set.workoutId
    await Sets.deleteOne({_id: id}, function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.redirect('/workout/info/' + workoutId);
}

module.exports.listAll = async function (req, res) {
    Workouts.find({ })
        .toArray()
        .then(results => res.json(results))
        .catch(error => res.send(error));
};