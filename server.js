if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')

const flash = require('express-flash');
const session = require('express-session');

const passport = require('passport');
const { allowedNodeEnvironmentFlags } = require('process');

const dotenv = require('dotenv').config()

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')
const bookRouter = require('./routes/books')
const allbooksRouter = require('./routes/allbooks')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use(flash(session));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(session())

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use('/', indexRouter)
app.use('/author', authorRouter)
app.use('/books', bookRouter)
app.use('/allbooks', allbooksRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))
app.listen(process.env.PORT || 3000)


module.exports = app;
