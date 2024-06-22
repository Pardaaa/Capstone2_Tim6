const { Mahasiswa: Mahasiswa, Beasiswa: beasiswa, PengajuanBeasiswa: ajuanBeasiswa } = require('../models');

exports.getBeasiswa = async (req, res) => {
   try {
      const Beasiswa = await beasiswa.findAll();
      res.render('mahasiswa/daftarBeasiswa', {
         Beasiswa: Beasiswa,
         title: 'List Beasiswa Beasiswa',
         message: req.query.message,
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.viewBeasiswa = async (req, res) => {
   const Beasiswa = await beasiswa.findOne({
      where: {
         id: req.params.id,
      },
   });
   res.render('fakultas/viewBeasiswa', {
      Beasiswa,
      title: 'Views Beasiswa',
   });
};

exports.getDaftarMahasiswa = async (req, res) => {
   try {
      const mahasiswaData = await Mahasiswa.findAll();
      res.render('fakultas/daftarMahasiswa', {
         mahasiswaBeasiswa: mahasiswaData,
         title: 'Data Mahasiswa Beasiswa',
      });
   } catch (error) {
      console.error('Error fetching mahasiswa data:', error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getBeasiswaById = async (req, res) => {
   try {
      const Beasiswa = await beasiswa.findOne({
         where: {
            id: req.params.id,
         },
      });
      const userId = req.session.userId;
      const existingSubmission = await ajuanBeasiswa.findOne({
         where: {
            userId: userId
         }
      });

      if (existingSubmission) {
         res.redirect('/mahasiswa/daftarBeasiswa?message=Anda hanya dapat mengajukan beasiswa Satu Kali per Periode');
      } else {
         res.render('mahasiswa/dokpengajuan', {
            beasiswa: Beasiswa,
            title: 'Pengajuan Beasiswa',
            message: req.query.message,
         });
      }
   } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error');
   }
};

exports.createPengajuanBeasiswa = async (req, res) => {
   try {
      const Beasiswa = await beasiswa.findOne({
         where: {
            id: req.params.id,
         },
      });

      const transkripAkademik = req.files.transkripAkademik ? req.files.transkripAkademik[0].buffer : null;
      const suratRekomendasiDosen = req.files.suratRekomendasiDosen ? req.files.suratRekomendasiDosen[0].buffer : null;
      const suratPernyataanBeasiswa = req.files.suratPernyataanBeasiswa ? req.files.suratPernyataanBeasiswa[0].buffer : null;
      const suratPelengkap = req.files.suratPelengkap ? req.files.suratPelengkap[0].buffer : null;
      const { ipk } = req.body;

      await ajuanBeasiswa.create({
         ipk: ipk,
         transkripAkademik: transkripAkademik,
         suratRekomendasiDosen: suratRekomendasiDosen,
         suratPernyataanBeasiswa: suratPernyataanBeasiswa,
         suratPelengkap: suratPelengkap,
         beasiswaId: req.params.id,
         userId: req.session.userId
      });

      res.status(201).redirect('/mahasiswa/daftarBeasiswa?message=Pengajuan Berhasil');
   } catch (error) {
      console.error('Error creating Pengajuan Beasiswa:', error);
      res.status(400).send('Bad Request');
   }
};
