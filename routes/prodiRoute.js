const express = require('express');
const {
    getProdi,
    viewProdi,
    getProdiById,
    createProdi,
    createProdiPage,
    updateProdi,
    deleteProdi,
    getMahasiswa,
    listPengaju,
    getAjuanById,
    viewFile
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
router.get('/prodi/listPengajuBeasiswa', authMiddleware, requesrRole('Program Studi'), listPengaju)
router.get('/prodi/dataPengajuBeasiswa/:id', authMiddleware, requesrRole('Program Studi'), getAjuanById)
router.get('/prodi/viewFile/:id/:type', authMiddleware, requesrRole('Program Studi'), viewFile)

module.exports = router;
