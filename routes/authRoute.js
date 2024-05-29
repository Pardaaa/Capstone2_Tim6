const express = require("express");
const {
    dashboard,
    loginPage,
    login,
    logout } = require('../controller/authController.js');

const router = express.Router();

router.get('/dashboard', dashboard)
router.get('/', loginPage);
router.post('/', login);
router.delete('/logout', logout);

module.exports = router;