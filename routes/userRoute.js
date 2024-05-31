const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    createUserPage,
    updateUser,
    deleteUser } = require('../controller/userController.js');

const router = express.Router();

// Users
router.get('/users', getUsers);
router.get('/users/edit/:id', getUsersById);
router.post('/users/edit/:id', updateUser);
router.get('/users/create', createUserPage);
router.post('/users/create', createUser);
router.get('/users/delete/:id', deleteUser);

module.exports = router;
