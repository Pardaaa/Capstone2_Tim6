const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    createUserPage,
    updateUser,
    deleteUser } = require('../controller/userController.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/:id', updateUser);
router.get('/createUsers', createUserPage);
router.post('/Createusers', createUser);
router.get('/deleteUsers/:id', deleteUser);

module.exports = router;
