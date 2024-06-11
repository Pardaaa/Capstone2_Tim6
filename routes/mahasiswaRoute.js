const express = require('express');
const router = express.Router();
const mahasiswa = require('../models/mahasiswa'); // Pastikan path ke model mahasiswa sudah benar
const mahasiswaController = require('../controllers/mahasiswaController'); // Past
// Rute untuk menampilkan halaman dashboard mahasiswa
router.get('/dokpengajuan', (req, res) => {
   res.render('mahasiswa/dokpengajuan', { title: 'Dashboard Mahasiswa' });
});

router.get('/pengaturan', (req, res) => {
   res.render('mahasiswa/pengaturan', { title: 'Dashboard Mahasiswa' });
});

router.get('/mahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/mahasiswa/:id', mahasiswaController.getMahasiswaById);
router.put('/mahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/mahasiswa/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;
