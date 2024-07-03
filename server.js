const express = require('express');
const path = require('path');
const app = express();
const pool = require('./models/databases/pg');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const initializePassport = require('./passportConfig');
const loginRouter = require('./routes/login');
const IndexRouter = require('./routes/index');
const inventoryAddStocksRouter = require('./routes/inventory-add-stocks');
const searchRouter = require('./routes/search');
const logoutRouter = require('./routes/logout');

// Database connection
pool.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

// Passport configuration
initializePassport(passport);

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Middleware to disable caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/login', loginRouter);
app.use('/', IndexRouter);
app.use('/inventory', inventoryAddStocksRouter);
app.use('/', searchRouter); 
app.use('/', logoutRouter);

// Start server
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
  console.log(`Listenng in port ${PORT} ...`);
});
