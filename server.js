const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

dotenv.config();

const userRoute = require('./routes/userRoute');
const fakultasRoute = require('./routes/fakultasRoute');
const prodiRoute = require('./routes/prodiRoute');
const authRoute = require('./routes/authRoute');
const mahasiswaRoute = require('./routes/mahasiswa');

const app = express();

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
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/master');

app.use(express.json());
app.use(userRoute);
app.use(fakultasRoute);
app.use(authRoute);
app.use(prodiRoute);
app.use('/mahasiswa', mahasiswaRoute);

app.listen(process.env.APP_PORT, () => {
   console.log('Server Berjalan');
});
