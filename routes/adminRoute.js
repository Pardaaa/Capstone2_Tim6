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
router.get('/users/edit/:id', getUsersById);
router.post('/users/edit/:id', updateUser);
router.get('/users/create', createUserPage);
router.post('/users/create', createUser);
router.get('/users/delete/:id', deleteUser);

module.exports = router;
