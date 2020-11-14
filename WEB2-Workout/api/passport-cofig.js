const { authenticate } = require('passport')

const bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local').Strategy

function init(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if(user == null) {
            console.log('No user with that email')
            return done(null, false, {message: 'No user with that email'})
        }
        else {
            try {
                console.log('login called')
                console.log(user)
                console.log(password);
                if(await bcrypt.compare(password, user.password)) {
                    console.log('succes')
                    return done(null, user)
                } else {
                    console.log('password incorrect')
                    return done(null, false, {message: 'password incorrect'})
                }
            }
            catch (e) {
                console.log(e);
                return done(null, false, {message: 'Something went wrong with your Signin'});
            }
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done) => {
        console.log(user._id)
        return done(null, user._id)
    })
    passport.deserializeUser((_id, done) => {
        return done(null, getUserById(_id))
    })
}

module.exports = init