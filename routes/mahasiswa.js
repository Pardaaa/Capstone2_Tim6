// routes/mahasiswa.js

const express = require('express');
const router = express.Router();

// Rute untuk menampilkan halaman dashboard mahasiswa
router.get('/dashboard', (req, res) => {
   res.render('mahasiswa/dashboard', { title: 'Dashboard Mahasiswa' });
});

router.get('/dokpengajuan', (req, res) => {
   res.render('mahasiswa/pengajuan', { title: 'Dashboard Mahasiswa' });
});
module.exports = router;
