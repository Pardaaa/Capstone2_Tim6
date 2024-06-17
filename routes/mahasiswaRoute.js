const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controller/mahasiswaController.js');
const authMiddleware = require('../middleware/auth');
const requestRole = require('../middleware/requestRole');

router.post(
   '/mahasiswa/dokpengajuan',
   authMiddleware,
   requestRole('Mahasiswa'),
   mahasiswaController.createMahasiswa
);
router.get(
   '/mahasiswa/dokpengajuan',
   authMiddleware,
   requestRole('Mahasiswa'),
   mahasiswaController.createMahasiswa
);

module.exports = router;
