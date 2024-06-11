const express = require('express');
const {
   getFakultas,
   viewFakultas,
   createFakultas,
   createFakultasPage,
   getFakultasById,
   updateFakultas,
   deleteFakultas,
} = require('../controller/fakultasController.js');

const router = express.Router();

// Fakultas
router.get('/fakultas', getFakultas);
router.get('/fakultas/views/:id', viewFakultas);
router.get('/fakultas/edit/:id', getFakultasById);
router.post('/fakultas/edit/:id', updateFakultas);
router.get('/fakultas/create', createFakultasPage);
router.post('/fakultas/create', createFakultas);
router.get('/fakultas/delete/:id', deleteFakultas);

module.exports = router;
