const express = require('express');
const {
    getProdi,
    viewProdi,
    getProdiById,
    createProdi,
    createProdiPage,
    updateProdi,
    deleteProdi
} = require('../controller/prodiController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/prodi', authMiddleware, getProdi);
router.get('/prodi/views/:id', authMiddleware, viewProdi);
router.get('/prodi/edit/:id', authMiddleware, getProdiById);
router.post('/prodi/edit/:id', authMiddleware, updateProdi);
router.get('/prodi/create', authMiddleware, createProdiPage);
router.post('/prodi/create', authMiddleware, createProdi);
router.get('/prodi/delete/:id', authMiddleware, deleteProdi);

module.exports = router;
