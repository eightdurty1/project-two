const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
// const indexRoutes = require('./routes/index');
// load the env consts
require('dotenv').config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

const indexRouter = require("./routes/index");
const locationsRouter = require("./routes/locations");
const commentsRouter = require("./routes/comments");
const res = require('express/lib/response');


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);



// view engine setup
app.set('views', path.join(__dirname, 'views'));//views
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});


// //global variables
// app.use(function (req, res, next) {
//   res.locals.isClicked = false;
//   res.locals.buttonClicked = () => {res.locals.isClicked = !res.locals.isClicked}
//   next();
// })

// mount all routes with appropriate base paths
app.use("/locations", locationsRouter);
app.use("/", commentsRouter);
app.use('/', indexRouter); //indexroutes??


// invalid request, send 404 page
app.use(function(req, res, next) {//next
  res.status(404).send('Cant find that!');
  next(createError(404))//added createError
});

//handles error
app.use(function (err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
