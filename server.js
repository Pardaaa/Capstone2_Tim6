const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
dotenv.config();

const userRoutes = require('./routes/userRoute.js');

const app = express();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/master');

app.use('/', userRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log('Server Berjalan')
});