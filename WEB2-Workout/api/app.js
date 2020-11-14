const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const logger = require('morgan');
require('./models/db');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const workoutRouter = require('./routes/workout');
const deleteRouter = require('./routes/delete');

const passport = require('passport');
const User = mongoose.model('User');
const initPassport = require('./passport-cofig');
initPassport(
    passport, 
    async email => {
        console.log('finding by email')
        try {
            const user = await User.findOne({'email': email}).exec()
            console.log('user is: ' + user)
            return user 
        }
        catch (e)
        {
            console.log(e)
            return null
        }
    },
    _id => {
        try {
            const user = User.findOne({'_id': _id})
            return user 
        } catch (e) {
            console.log(e)
            return null
        }
    }
);

const app = express();

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/delete', deleteRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/workout', workoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
  
module.exports = app;
  