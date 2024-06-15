const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    createUserPage,
    updateUser,
    deleteUser,
    getBeasiswa,
    createBeasiswaPage,
    createBeasiswa } = require('../controller/adminController');
const authMiddleware = require('../middleware/auth');
const requesrRole = require('../middleware/requestRole');

const router = express.Router();

// Users
router.get('/users', authMiddleware, requesrRole('Admin'), getUsers);
router.get('/users/edit/:id', authMiddleware, requesrRole('Admin'), getUsersById);
router.post('/users/edit/:id', authMiddleware, requesrRole('Admin'), updateUser);
router.get('/users/create', authMiddleware, requesrRole('Admin'), createUserPage);
router.post('/users/create', authMiddleware, requesrRole('Admin'), createUser);
router.get('/users/delete/:id', authMiddleware, requesrRole('Admin'), deleteUser);

router.get('/beasiswa', authMiddleware, requesrRole('Admin'), getBeasiswa)
router.get('/beasiswa/create', authMiddleware, requesrRole('Admin'), createBeasiswaPage);
router.post('/beasiswa/create', authMiddleware, requesrRole('Admin'), createBeasiswa);

module.exports = router;
