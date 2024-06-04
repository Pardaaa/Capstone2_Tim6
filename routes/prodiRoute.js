const express = require("express");
const {
    getProdi,
    viewProdi,
    getProdiById,
    createProdi,
    createProdiPage,
    updateProdi,
    deleteProdi } = require('../controller/prodiController');

const router = express.Router();

// Users
router.get('/prodi', getProdi);
router.get('/prodi/views/:id', viewProdi);
router.get('/prodi/edit/:id', getProdiById);
router.post('/prodi/edit/:id', updateProdi);
router.get('/prodi/create', createProdiPage);
router.post('/prodi/create', createProdi);
router.get('/prodi/delete/:id', deleteProdi);

module.exports = router;
