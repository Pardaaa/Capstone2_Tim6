// routes/mahasiswa.js

const express = require('express');
const router = express.Router();

// Rute untuk menampilkan halaman dashboard mahasiswa
router.get('/dashboard', (req, res) => {
   res.render('mahasiswa/dashboard', { title: 'Dashboard Mahasiswa' });
});

router.get('/dokpengajuan', (req, res) => {
   res.render('mahasiswa/dokpengajuan', { title: 'Dashboard Mahasiswa' });
});

router.get('/pengaturan', (req, res) => {
   res.render('mahasiswa/pengaturan', { title: 'Dashboard Mahasiswa' });
});
module.exports = router;
