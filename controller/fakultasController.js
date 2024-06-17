const {
   User: user,
   Fakultas: fakultas,
   Programstudi: prodi,
   Beasiswa: beasiswa,
   Mahasiswa: mahasiswa,
} = require('../models');

// Nathan
exports.getFakultas = async (req, res) => {
   try {
      const Fakultas = await fakultas.findAll();
      res.render('fakultas/fakultas', {
         Fakultas: Fakultas,
         title: 'Fakultas',
         message: req.query.message,
      });
   } catch (error) {
      console.error(error);
      res.status(404).send('Fakultas not found');
   }
};

exports.getProdi = async (req, res) => {
   try {
      const prodis = await prodi.findAll({
         where: {
            fakultas_id: req.session.fakultas,
         },
      });
      const Fakultas = await fakultas.findOne({
         where: {
            id: req.session.fakultas,
         },
      });
      res.render('fakultas/daftarProdi', {
         prodis: prodis,
         Fakultas: Fakultas,
         title: 'Daftar Program Studi',
         message: req.query.message,
      });
   } catch (error) {
      console.error(error);
      res.status(404).send('Prodi not found');
   }
};

exports.viewFakultas = async (req, res) => {
   try {
      const users = await user.findAll({
         where: { fakultas_id: req.params.id },
      });
      const prodis = await prodi.findAll({
         where: { fakultas_id: req.params.id },
      });
      const Fakultas = await fakultas.findOne({
         where: { id: req.params.id },
      });
      res.render('fakultas/viewFakultas', {
         users,
         prodis,
         Fakultas,
         title: 'Views Fakultas',
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getFakultasById = async (req, res) => {
   try {
      const Fakultas = await fakultas.findOne({
         where: {
            id: req.params.id,
         },
      });
      if (Fakultas) {
         res.render('fakultas/updateFakultas', {
            fakultas: Fakultas,
            title: 'Update Fakultas',
            message: req.query.message,
         });
      } else {
         res.status(404).send('Fakultas not found');
      }
   } catch (error) {
      res.status(500).send('Internal Server Error');
   }
};

exports.createFakultasPage = (req, res) => {
   res.render('fakultas/addFakultas', {
      title: 'Tambah Fakultas',
      message: req.query.message,
   });
};

exports.createFakultas = async (req, res) => {
   const { fakultas_id, namaFakultas } = req.body;
   try {
      const exsistFakultasId = await fakultas.findOne({
         where: { fakultas_id: fakultas_id },
      });
      if (exsistFakultasId) {
         return res
            .status(400)
            .redirect('/fakultas/create?message=Fakultas ID sudah digunakan');
      }
      const exsistNamaFakultas = await fakultas.findOne({
         where: { namaFakultas: namaFakultas },
      });
      if (exsistNamaFakultas) {
         return res
            .status(400)
            .redirect('/fakultas/create?message=Nama Fakultas sudah digunakan');
      }

      await fakultas.create({
         fakultas_id: fakultas_id,
         namaFakultas: namaFakultas,
      });
      res.redirect('/fakultas?message=Input Berhasil');
   } catch (error) {
      res.status(400);
   }
};

exports.updateFakultas = async (req, res) => {
   const Fakultas = await fakultas.findOne({
      where: {
         id: req.params.id,
      },
   });
   const { fakultas_id, namaFakultas } = req.body;
   const fakultasID = req.params.id;
   try {
      if (namaFakultas !== Fakultas.namaFakultas) {
         const exsistNamaFakultas = await fakultas.findOne({
            where: { namaFakultas: namaFakultas },
         });
         if (exsistNamaFakultas) {
            return res
               .status(400)
               .redirect(
                  `/fakultas/edit/${fakultasID}?message=Nama Fakultas sudah digunakan`
               );
         }
      }
      await fakultas.update(
         {
            fakultas_id: fakultas_id,
            namaFakultas: namaFakultas,
         },
         {
            where: {
               id: Fakultas.id,
            },
         }
      );
      res.status(200).redirect('/fakultas?message=Update Berhasil');
   } catch (error) {
      res.status(400);
   }
};

exports.deleteFakultas = async (req, res) => {
   const Fakultas = await fakultas.findOne({
      where: {
         id: req.params.id,
      },
   });
   try {
      await fakultas.destroy({
         where: {
            id: Fakultas.id,
         },
      });
      res.status(200).redirect('/fakultas?message=Delete Berhasil');
   } catch (error) {
      res.status(400);
   }
};

// Nathan

// Nabilla
exports.getBeasiswa = async (req, res) => {
   try {
      const beasiswaData = await beasiswa.findOne();
      res.render('fakultas/beasiswa', {
         beasiswa: beasiswaData,
         title: 'Pengaturan Pengajuan Beasiswa',
         message: req.query.message,
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.updateBeasiswa = async (req, res) => {
   const { start_date, end_date, deskripsi } = req.body;
   try {
      let beasiswaData = await Beasiswa.findOne();
      if (beasiswaData) {
         await Beasiswa.update(
            {
               start_date,
               end_date,
            },
            {
               where: { id: beasiswaData.id },
            }
         );
      } else {
         beasiswaData = await Beasiswa.create({
            start_date,
            end_date,
         });
      }
      res.redirect('/fakultas/beasiswa?message=Update Berhasil');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};
exports.getDaftarMahasiswa = async (req, res) => {
   try {
      const fakultasId = req.session.fakultasId;
      const mahasiswaBeasiswa = await mahasiswa.findAll({
         where: { fakultasId },
         include: [
            { model: beasiswa, attributes: ['jenisBeasiswa'] },
            { model: prodi, attributes: ['namaProgramStudi'] },
         ],
      });

      const formattedData = mahasiswaBeasiswa.map(mb => ({
         id: mb.id,
         namaMahasiswa: mb.namaMahasiswa,
         jenisBeasiswa: mb.Beasiswa.jenisBeasiswa,
         programStudi: mb.Programstudi.namaProgramStudi,
         statusAplikasi: mb.statusAplikasi,
      }));

      res.render('fakultas/daftarMahasiswa', {
         mahasiswaBeasiswa: formattedData,
         Fakultas: { namaFakultas: req.query.namaFakultas },
      });
   } catch (error) {
      console.error('Error fetching mahasiswa beasiswa:', error);
      res.status(500).send('Internal Server Error');
   }
};
