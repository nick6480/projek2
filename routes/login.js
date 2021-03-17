var express = require('express');
var router = express.Router();
const db = require("../private/db")

const session = require('express-session');
const flash = require('express-flash');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

let users = [{
    id: '1615980051699',
    name: 'Nickolaj Sørensen',
    email: 'asdsad@sdasd',
    password: '$2b$10$EejVw5nNGGkaumgL4wzmUOngGLkE0gG1Ffjd2wwWB4MehiVgTxiHW'
  }];

const initializePassport = require('../passport-config');
const passport = require('passport');

const { config } = require('../node_modules/dotenv/types/tsconfig.json');


initializePassport(passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);



router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', passport.authenticate('local', {

  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true

}))




module.exports = router;
