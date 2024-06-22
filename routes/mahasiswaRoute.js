const express = require('express');

const {
   getBeasiswa,
   viewBeasiswa,
   getBeasiswaById,
   createPengajuanBeasiswa,
} = require('../controller/mahasiswaController.js');
const authMiddleware = require('../middleware/auth');
const requestRole = require('../middleware/requestRole');
const uploadFiles = require('../middleware/uploadFiles');
const router = express.Router();

router.get(
   '/mahasiswa/daftarBeasiswa',
   authMiddleware,
   requestRole('Mahasiswa'),
   getBeasiswa
);
router.get(
   '/mahasiswa/daftarBeasiswa/views/:id',
   authMiddleware,
   requestRole('Mahasiswa'),
   viewBeasiswa
);
router.get(
   '/mahasiswa/daftarBeasiswa/ajukanBeasiswa/:id',
   authMiddleware,
   requestRole('Mahasiswa'),
   getBeasiswaById
);
router.post(
   '/mahasiswa/daftarBeasiswa/ajukanBeasiswa/:id',
   authMiddleware,
   requestRole('Mahasiswa'),
   uploadFiles,
   createPengajuanBeasiswa
);

// router.post(
//    '/mahasiswa/dokpengajuan',
//    authMiddleware,
//    requestRole('Mahasiswa'),
//    mahasiswaController.createMahasiswa
// );

// router.get(
//    '/mahasiswa/dokpengajuan',
//    authMiddleware,
//    requestRole('Mahasiswa'),
//    mahasiswaController.createMahasiswa
// );

module.exports = router;
