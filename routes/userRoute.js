const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    updateUsers,
    updateUser,
    deleteUser } = require('../controller/userController.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.get('/updateUsers/:id', updateUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
