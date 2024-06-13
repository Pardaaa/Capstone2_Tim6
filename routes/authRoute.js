const express = require("express");
const {
    dashboard,
    loginPage,
    login,
    logout,
    forgetPassPage,
    forgetPass,
    recoPassPage,
    recoPass } = require('../controller/authController.js');

const router = express.Router();

router.get('/dashboard', dashboard)
router.get('/', loginPage);
router.post('/', login);
router.get('/logout', logout);
router.get('/forgetPass', forgetPassPage)
router.post('/forgetPass', forgetPass)
router.get('/recoPass', recoPassPage)
router.post('/recoPass', recoPass)

module.exports = router;