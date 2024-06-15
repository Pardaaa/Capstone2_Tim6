const express = require('express');
const {
   getFakultas,
   viewFakultas,
   createFakultas,
   createFakultasPage,
   getFakultasById,
   updateFakultas,
   deleteFakultas,
   getProdi
} = require('../controller/fakultasController.js');
const authMiddleware = require('../middleware/auth');
const requesrRole = require('../middleware/requestRole');

const router = express.Router();

router.get('/fakultas', authMiddleware, requesrRole('Admin'), getFakultas);
router.get('/fakultas/views/:id', authMiddleware, requesrRole('Admin'), viewFakultas);
router.get('/fakultas/edit/:id', authMiddleware, requesrRole('Admin'), getFakultasById);
router.post('/fakultas/edit/:id', authMiddleware, requesrRole('Admin'), updateFakultas);
router.get('/fakultas/create', authMiddleware, requesrRole('Admin'), createFakultasPage);
router.post('/fakultas/create', authMiddleware, requesrRole('Admin'), createFakultas);
router.get('/fakultas/delete/:id', authMiddleware, requesrRole('Admin'), deleteFakultas);
router.get('/fakultas/delete/:id', authMiddleware, requesrRole('Admin'), deleteFakultas);
router.get('/fakultas/listProdi', authMiddleware, requesrRole('Fakultas'), getProdi);

module.exports = router;
