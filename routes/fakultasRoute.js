const express = require('express');
const router = express.Router();
const {
   getFakultas,
   viewFakultas,
   createFakultas,
   createFakultasPage,
   getFakultasById,
   updateFakultas,
   deleteFakultas,
   getProdi,
   getBeasiswa,
   updateBeasiswa,
   getDaftarMahasiswa,
} = require('../controller/fakultasController.js');
const authMiddleware = require('../middleware/auth');
const requestRole = require('../middleware/requestRole'); // Sesuaikan typo

router.get('/fakultas', authMiddleware, requestRole('Admin'), getFakultas);
router.get(
   '/fakultas/views/:id',
   authMiddleware,
   requestRole('Admin'),
   viewFakultas
);
router.get(
   '/fakultas/edit/:id',
   authMiddleware,
   requestRole('Admin'),
   getFakultasById
);
router.post(
   '/fakultas/edit/:id',
   authMiddleware,
   requestRole('Admin'),
   updateFakultas
);
router.get(
   '/fakultas/create',
   authMiddleware,
   requestRole('Admin'),
   createFakultasPage
);
router.post(
   '/fakultas/create',
   authMiddleware,
   requestRole('Admin'),
   createFakultas
);
router.get(
   '/fakultas/delete/:id',
   authMiddleware,
   requestRole('Admin'),
   deleteFakultas
);
router.get(
   '/fakultas/listProdi',
   authMiddleware,
   requestRole('Fakultas'),
   getProdi
);
router.get(
   '/fakultas/beasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   getBeasiswa
); // Sesuaikan dengan controller Anda
router.post(
   '/fakultas/beasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   updateBeasiswa
); // Sesuaikan dengan controller Anda
router.get(
   '/fakultas/daftarMahasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   getDaftarMahasiswa
);
module.exports = router;
