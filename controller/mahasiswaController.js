const { raw } = require('express');
const {
   Mahasiswa: Mahasiswa,
   User: users,
   Beasiswa: beasiswa,
   PengajuanBeasiswa: ajuanBeasiswa,
   Periode: periode,
} = require('../models');
const { Model, where } = require('sequelize');

exports.getBeasiswa = async (req, res) => {
   try {
      const Beasiswa = await beasiswa.findAll({
         include: periode,
      });
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
      include: periode,
      raw: true,
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
         include: [
            {
               model: periode,
            },
         ],
      });

      const validasiStatus = await users.findOne({
         where: {
            id: req.session.userId,
         },
      });

      if (validasiStatus.status !== 'Aktif') {
         return res.redirect(
            '/mahasiswa/daftarBeasiswa?message=Pengajuan Beasiswa hanya dapat dilakukan oleh Mahasiwa Aktif!'
         );
      }

      const existingSubmission = await ajuanBeasiswa.findOne({
         where: {
            userId: req.session.userId,
         },
         include: [
            {
               model: beasiswa,
               where: {
                  periodeId: Beasiswa.periodeId,
               },
               include: [
                  {
                     model: periode,
                  },
               ],
            },
         ],
      });

      if (existingSubmission) {
         res.redirect(
            '/mahasiswa/daftarBeasiswa?message=Anda hanya dapat mengajukan beasiswa satu kali per periode'
         );
      } else {
         res.render('mahasiswa/dokpengajuan', {
            beasiswa: Beasiswa,
            title: 'Pengajuan Beasiswa',
            message: req.query.message,
         });
      }
   } catch (error) {
      console.error(error);
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

      const transkripAkademik = req.files.transkripAkademik
         ? req.files.transkripAkademik[0].buffer
         : null;
      const suratRekomendasiDosen = req.files.suratRekomendasiDosen
         ? req.files.suratRekomendasiDosen[0].buffer
         : null;
      const suratPernyataanBeasiswa = req.files.suratPernyataanBeasiswa
         ? req.files.suratPernyataanBeasiswa[0].buffer
         : null;
      const suratPelengkap = req.files.suratPelengkap
         ? req.files.suratPelengkap[0].buffer
         : null;
      const { ipk } = req.body;

      await ajuanBeasiswa.create({
         ipk: ipk,
         transkripAkademik: transkripAkademik,
         suratRekomendasiDosen: suratRekomendasiDosen,
         suratPernyataanBeasiswa: suratPernyataanBeasiswa,
         suratPelengkap: suratPelengkap,
         beasiswaId: req.params.id,
         userId: req.session.userId,
      });

      res.status(201).redirect(
         '/mahasiswa/daftarBeasiswa?message=Pengajuan Berhasil'
      );
   } catch (error) {
      console.error('Error creating Pengajuan Beasiswa:', error);
      res.status(400).send('Bad Request');
   }
};

exports.approvalBeasiswa = async (req, res) => {
   try {
      const Pengajuan = await ajuanBeasiswa.findOne({
         include: [
            {
               model: beasiswa,
               include: [
                  {
                     model: periode,
                  },
               ],
            },
            {
               model: users,
               where: {
                  id: req.session.userId,
               },
            },
         ],
         raw: true,
      });

      if (!Pengajuan) {
         return res.redirect(
            '/mahasiswa/daftarBeasiswa?message=Anda belum melakukan pengajuan apapun'
         );
      }

      res.render('mahasiswa/statusPengajuan', {
         pengajuan: Pengajuan,
         title: 'Status Pengajuan',
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getHistoryPengajuan = async (req, res) => {
   try {
      const pengajuanHistory = await ajuanBeasiswa.findAll({
         where: { userId: req.session.userId },
         include: [
            {
               model: beasiswa,
               include: [periode],
            },
         ],
         raw: true,
         nest: true,
      });

      res.render('mahasiswa/history', {
         pengajuanHistory,
         title: 'History Pengajuan Beasiswa',
      });
   } catch (error) {
      console.error('Error fetching history pengajuan:', error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getPengajuanById = async (req, res) => {
   try {
      const pengajuan = await ajuanBeasiswa.findOne({
         where: {
            id: req.params.id,
         },
      });
      res.render('mahasiswa/editPengajuan', { pengajuan, title: 'Edit Pengajuan', message: req.query.message, })
   } catch (error) {
      console.error(error)
   }
}

exports.editPengajuan = async (req, res) => {
   const pengajuan = await ajuanBeasiswa.findOne({
      where: {
         id: req.params.id,
      },
   });
   const { ipk } = req.body
   const transkripAkademik = req.files.transkripAkademik
      ? req.files.transkripAkademik[0].buffer
      : pengajuan.transkripAkademik;

   const suratRekomendasiDosen = req.files.suratRekomendasiDosen
      ? req.files.suratRekomendasiDosen[0].buffer
      : pengajuan.suratRekomendasiDosen;

   const suratPernyataanBeasiswa = req.files.suratPernyataanBeasiswa
      ? req.files.suratPernyataanBeasiswa[0].buffer
      : pengajuan.suratPernyataanBeasiswa;

   const suratPelengkap = req.files.suratPelengkap
      ? req.files.suratPelengkap[0].buffer
      : pengajuan.suratPelengkap;
   try {
      await ajuanBeasiswa.update({
         ipk: ipk,
         transkripAkademik: transkripAkademik,
         suratRekomendasiDosen: suratRekomendasiDosen,
         suratPernyataanBeasiswa: suratPernyataanBeasiswa,
         suratPelengkap: suratPelengkap
      }, {
         where: {
            id: pengajuan.id
         }
      })

      res.redirect(`/mahasiswa/statusPengajuan?message=Edit Berhasil`);
   } catch (error) {
      console.error(error)
   }
}

exports.deletePengajuan = async (req, res) => {
   const pengajuan = await ajuanBeasiswa.findOne({
      where: {
         id: req.params.id,
      },
   });
   try {
      await ajuanBeasiswa.destroy({
         where: {
            id: pengajuan.id,
         },
      });
      res.redirect(`/mahasiswa/statusPengajuan?message=Hapus Pengajuan Berhasil`);
   } catch (error) {
      res.status(400);
   }
};