const express = require('express');
const {
    getProdi,
    viewProdi,
    getProdiById,
    createProdi,
    createProdiPage,
    updateProdi,
    deleteProdi,
    getMahasiswa
} = require('../controller/prodiController');
const authMiddleware = require('../middleware/auth');
const requesrRole = require('../middleware/requestRole');

const router = express.Router();

router.get('/prodi', authMiddleware, requesrRole('Admin'), getProdi);
router.get('/prodi/views/:id', authMiddleware, requesrRole('Admin', 'Fakultas'), viewProdi);
router.get('/prodi/edit/:id', authMiddleware, requesrRole('Admin'), getProdiById);
router.post('/prodi/edit/:id', authMiddleware, requesrRole('Admin'), updateProdi);
router.get('/prodi/create', authMiddleware, requesrRole('Admin'), createProdiPage);
router.post('/prodi/create', authMiddleware, requesrRole('Admin'), createProdi);
router.get('/prodi/delete/:id', authMiddleware, requesrRole('Admin'), deleteProdi);

router.get('/prodi/listMahasiswa', authMiddleware, requesrRole('Program Studi'), getMahasiswa)

module.exports = router;
