const { Mahasiswa } = require('../models');

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

exports.createMahasiswa = async (req, res) => {
   const { nama, nrp, ipk, agama, programStudi, statusAplikasi } = req.body;
   try {
      const newMahasiswa = await Mahasiswa.create({
         namaMahasiswa: nama,
         nrpMahasiswa: nrp,
         ipkMahasiswa: ipk,
         agamaMahasiswa: agama,
         programStudi: programStudi,
         statusAplikasi: statusAplikasi,
      });
      res.status(201).json(newMahasiswa);
   } catch (error) {
      console.error('Error creating mahasiswa:', error);
      res.status(400).send('Bad Request');
   }
};
