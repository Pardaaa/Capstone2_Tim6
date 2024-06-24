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
   getBeasiswaById,
   updateBeasiswa,
   getDaftarMahasiswa,
   viewBeasiswa,
   getProdiBeasiswa,
   approvalBeasiswa,
} = require('../controller/fakultasController.js');
const authMiddleware = require('../middleware/auth');
const requestRole = require('../middleware/requestRole');

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
   '/fakultas/ProgramStudiBeasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   getProdiBeasiswa
);
router.get(
   '/fakultas/beasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   getBeasiswa
);

router.get(
   '/fakultas/beasiswa/edit/:id',
   authMiddleware,
   requestRole('Fakultas'),
   getBeasiswaById
);
router.post(
   '/fakultas/beasiswa/edit/:id',
   authMiddleware,
   requestRole('Fakultas'),
   updateBeasiswa
);

router.get(
   '/fakultas/daftarMahasiswa',
   authMiddleware,
   requestRole('Fakultas'),
   getDaftarMahasiswa
);

router.get(
   '/fakultas/beasiswa/views/:id',
   authMiddleware,
   requestRole('Fakultas'),
   viewBeasiswa
);
router.get(
   '/fakultas/ProgramStudi/ApprovalBeasiswa/:id',
   authMiddleware,
   requestRole('Fakultas'),
   approvalBeasiswa
);
router.post(
   '/fakultas/approvalBeasiswa/:id',
   authMiddleware,
   requestRole('Fakultas'),
   approvalBeasiswa
);

module.exports = router;
