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
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/fakultas', authMiddleware, getFakultas);
router.get('/fakultas/views/:id', authMiddleware, viewFakultas);
router.get('/fakultas/edit/:id', authMiddleware, getFakultasById);
router.post('/fakultas/edit/:id', authMiddleware, updateFakultas);
router.get('/fakultas/create', authMiddleware, createFakultasPage);
router.post('/fakultas/create', authMiddleware, createFakultas);
router.get('/fakultas/delete/:id', authMiddleware, deleteFakultas);

module.exports = router;
