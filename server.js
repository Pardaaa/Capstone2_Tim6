const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./config/database.js');
const expressLayouts = require('express-ejs-layouts');
dotenv.config();

const adminRoute = require('./routes/adminRoute.js');
const authRoute = require('./routes/authRoute.js');

const app = express();
app.set('view engine', 'ejs');

app.use(
   session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
         secure: 'auto',
      },
   })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/master');

app.use(express.json());
app.use(userRoute);
app.use(fakultasRoute);
app.use(authRoute);
app.use('/mahasiswa', mahasiswaRoute);

app.listen(process.env.APP_PORT, () => {
   console.log('Server Berjalan');
});
