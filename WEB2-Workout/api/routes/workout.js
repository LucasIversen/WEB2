var express = require('express');
var router = express.Router();
const workoutController = require('../controllers/workout_controller')
const indexController = require('../controllers/index_controller')

router.get('/add/', checkAuthenticated, workoutController.addWorkoutForm);

router.post('/add/', checkAuthenticated, workoutController.addWorkout);

router.get('/info/:id', checkAuthenticated, workoutController.WorkoutInfoForm);

router.post('/info/:id', checkAuthenticated, workoutController.addSet);

router.get('/info/delete/:id', checkAuthenticated, workoutController.deleteSet)

router.get('/list/', checkAuthenticated, indexController.homePage);

router.get('/listAll/', workoutController.listAll);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}

module.exports = router;