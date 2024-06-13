const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    createUserPage,
    updateUser,
    deleteUser } = require('../controller/userController.js');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Users
router.get('/users', authMiddleware, getUsers);
router.get('/users/edit/:id', authMiddleware, getUsersById);
router.post('/users/edit/:id', authMiddleware, updateUser);
router.get('/users/create', authMiddleware, createUserPage);
router.post('/users/create', authMiddleware, createUser);
router.get('/users/delete/:id', authMiddleware, deleteUser);

module.exports = router;
