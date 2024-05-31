const express = require("express");
const {
    getFakultas,
    createFakultas,
    createFakultasPage,
    getFakultasById,
    updateFakultas } = require('../controller/fakultasController.js');

const router = express.Router();

// Fakultas
router.get('/fakultas', getFakultas);
router.get('/fakultas/edit/:id', getFakultasById);
router.post('/fakultas/edit/:id', updateFakultas);
router.get('/fakultas/create', createFakultasPage);
router.post('/fakultas/create', createFakultas);

module.exports = router;