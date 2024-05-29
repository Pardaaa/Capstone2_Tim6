const express = require("express");
const {
    dashboard,
    getUsers,
    getUsersById,
    createUser,
    createUserPage,
    updateUser,
    deleteUser } = require('../controller/adminController.js');

const router = express.Router();

router.get('/dashboard', dashboard)
router.get('/users', getUsers);
router.get('/updateUsers/:id', getUsersById);
router.post('/updateUsers/:id', updateUser);
router.get('/createUsers', createUserPage);
router.post('/Createusers', createUser);
router.get('/deleteUsers/:id', deleteUser);

module.exports = router;
