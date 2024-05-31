// routes/mahasiswaRoute.js
const express = require('express');
const router = express.Router();
const Beasiswa = require('../models/beasiswa');

// Render dashboard
router.get('/dashboard', async (req, res) => {
   try {
      const beasiswa = await Beasiswa.findOne({
         where: { mahasiswaId: req.user.id },
      });
      res.render('mahasiswa/dashboard', {
         title: 'Dashboard Mahasiswa',
         beasiswa,
      });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Menampilkan halaman dashboard dengan form pengajuan beasiswa
router.get('/beasiswa', async (req, res) => {
   try {
      const beasiswa = await Beasiswa.findOne({
         where: { mahasiswaId: req.user.id },
      });
      res.render('mahasiswa/dashboard', {
         title: 'Dashboard Mahasiswa',
         beasiswa,
      });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Menambahkan pengajuan beasiswa
router.post('/beasiswa', async (req, res) => {
   const { ipkTerakhir, jenisBeasiswa, dokumen, semester } = req.body;

   try {
      const existingSubmission = await Beasiswa.findOne({
         where: { mahasiswaId: req.user.id, semester },
      });
      if (existingSubmission) {
         return res
            .status(400)
            .send('Anda sudah mengajukan beasiswa semester ini.');
      }

      await Beasiswa.create({
         mahasiswaId: req.user.id,
         ipkTerakhir,
         jenisBeasiswa,
         dokumen,
         semester,
      });

      res.redirect('/mahasiswa/beasiswa');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Mengubah pengajuan beasiswa
router.put('/beasiswa/:id', async (req, res) => {
   const { ipkTerakhir, jenisBeasiswa, dokumen, semester } = req.body;

   try {
      const beasiswa = await Beasiswa.findOne({
         where: { id: req.params.id, mahasiswaId: req.user.id },
      });
      if (!beasiswa) {
         return res.status(404).send('Pengajuan tidak ditemukan.');
      }

      await beasiswa.update({ ipkTerakhir, jenisBeasiswa, dokumen, semester });
      res.redirect('/mahasiswa/beasiswa');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Menghapus pengajuan beasiswa
router.delete('/beasiswa/:id', async (req, res) => {
   try {
      const beasiswa = await Beasiswa.findOne({
         where: { id: req.params.id, mahasiswaId: req.user.id },
      });
      if (!beasiswa) {
         return res.status(404).send('Pengajuan tidak ditemukan.');
      }

      await beasiswa.destroy();
      res.redirect('/mahasiswa/beasiswa');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

module.exports = router;
