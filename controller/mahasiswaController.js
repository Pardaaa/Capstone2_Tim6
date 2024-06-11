// const Mahasiswa = require('../models/mahasiswa');

// exports.getAllMahasiswa = async (req, res) => {
//     try {
//         const mahasiswas = await Mahasiswa.findAll();
//         res.render('administrator/mahasiswa/mahasiswa', { mahasiswas, title: 'Mahasiswa', message: req.query.message });
//     } catch (error) {
//         res.status(404).send('Mahasiswa not found');
//     }
// };

// exports.viewMahasiswa = async (req, res) => {
//     try {
//         const mahasiswa = await Mahasiswa.findByPk(req.params.id);
//         if (mahasiswa) {
//             res.render('administrator/mahasiswa/viewMahasiswa', { mahasiswa, title: 'View Mahasiswa' });
//         } else {
//             res.status(404).send('Mahasiswa not found');
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// }

// exports.getMahasiswaById = async (req, res) => {
//     try {
//         const mahasiswa = await Mahasiswa.findByPk(req.params.id);
//         if (mahasiswa) {
//             res.render('administrator/mahasiswa/updateMahasiswa', { mahasiswa, title: 'Update Mahasiswa', message: req.query.message });
//         } else {
//             res.status(404).send('Mahasiswa not found');
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// }

// exports.createMahasiswaPage = (req, res) => {
//     res.render('administrator/mahasiswa/addMahasiswa', { title: 'Tambah Mahasiswa', message: req.query.message })
// }

// exports.createMahasiswa = async (req, res) => {
//     const { nama, nrp, ipkTerakhir, agama, jenisBeasiswa } = req.body;
//     try {
//         await Mahasiswa.create({
//             nama,
//             nrp,
//             ipkTerakhir,
//             agama,
//             jenisBeasiswa
//         });
//         res.redirect('/mahasiswa?message=Input Berhasil');
//     } catch (error) {
//         res.status(400).send('Bad Request');
//     }
// }

// exports.updateMahasiswa = async (req, res) => {
//     const { nama, nrp, ipkTerakhir, agama, jenisBeasiswa } = req.body;
//     try {
//         const mahasiswa = await Mahasiswa.findByPk(req.params.id);
//         if (mahasiswa) {
//             await mahasiswa.update({
//                 nama,
//                 nrp,
//                 ipkTerakhir,
//                 agama,
//                 jenisBeasiswa
//             });
//             res.status(200).redirect('/mahasiswa?message=Update Berhasil');
//         } else {
//             res.status(404).send('Mahasiswa not found');
//         }
//     } catch (error) {
//         res.status(400).send('Bad Request');
//     }
// }

// exports.deleteMahasiswa = async (req, res) => {
//     try {
//         const mahasiswa = await Mahasiswa.findByPk(req.params.id);
//         if (mahasiswa) {
//             await mahasiswa.destroy();
//             res.status(200).redirect('/mahasiswa?message=Delete Berhasil');
//         } else {
//             res.status(404).send('Mahasiswa not found');
//         }
//     } catch (error) {
//         res.status(400).send('Bad Request');
//     }
// }
