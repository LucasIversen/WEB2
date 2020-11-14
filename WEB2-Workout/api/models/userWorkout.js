const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

const setSchema = new mongoose.Schema({
    setName: {
        type: String,
        required: true
    },
    setsTime: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    repetetions: {
        type: String,
        required: true
    },
    workoutId: {
        type: String,
        required: true
    }
});

const workoutSchema = new mongoose.Schema({
    workoutName: {
        type: String,
        required: true
    },
    sets: [setSchema],
    userId: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Workout', workoutSchema);
module.exports = mongoose.model('Set', setSchema);