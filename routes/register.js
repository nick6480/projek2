var express = require('express');
var router = express.Router();
const db = require("../private/db")

const session = require('express-session');
const flash = require('express-flash');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');


const initializePassport = require('../passport-config');
const passport = require('passport');
const { config } = require('../node_modules/dotenv/types/tsconfig.json');
initializePassport(passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);
/* GET home page. */

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
/*
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {

  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true

}))
*/

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


var userSchema = mongoose.Schema ({
  id: Number,
  name: String,
  email: String,
  password: String,
});


router.post('/', async function(req, res, next) {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };



    db.create("users", "users", user, userSchema, true,"email" , user.email);



    res.redirect('/login');
  } catch {
    res.redirect('/register')
  }
  //onsole.log(users);
});


module.exports = router;
