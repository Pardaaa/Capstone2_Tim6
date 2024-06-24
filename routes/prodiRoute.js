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
    viewFile,
    updateAjuanStatus,
    saveCheckboxStatus,
    getCheckboxStatus,
    saveDescription
} = require('../controller/prodiController');
const authMiddleware = require('../middleware/auth');
const requestRole = require('../middleware/requestRole');

const router = express.Router();

router.get('/prodi', authMiddleware, requestRole('Admin'), getProdi);
router.get('/prodi/views/:id', authMiddleware, requestRole('Admin', 'Fakultas'), viewProdi);
router.get('/prodi/edit/:id', authMiddleware, requestRole('Admin'), getProdiById);
router.post('/prodi/edit/:id', authMiddleware, requestRole('Admin'), updateProdi);
router.get('/prodi/create', authMiddleware, requestRole('Admin'), createProdiPage);
router.post('/prodi/create', authMiddleware, requestRole('Admin'), createProdi);
router.get('/prodi/delete/:id', authMiddleware, requestRole('Admin'), deleteProdi);

router.get('/prodi/listMahasiswa', authMiddleware, requestRole('Program Studi'), getMahasiswa);
router.get('/prodi/listPengajuBeasiswa', authMiddleware, requestRole('Program Studi'), listPengaju);
router.get('/prodi/dataPengajuBeasiswa/:id', authMiddleware, requestRole('Program Studi'), getAjuanById);
router.post('/prodi/dataPengajuBeasiswa/:id', authMiddleware, requestRole('Program Studi'), updateAjuanStatus);
router.get('/prodi/viewFile/:id/:type', authMiddleware, requestRole('Program Studi'), viewFile);

router.post('/save-checkbox-status', authMiddleware, requestRole('Program Studi'), saveCheckboxStatus);
router.get('/get-checkbox-status', authMiddleware, requestRole('Program Studi'), getCheckboxStatus);

module.exports = router;