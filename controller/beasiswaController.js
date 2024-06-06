// controller/beasiswaController.js
const getBeasiswa = (req, res) => {
   res.send('Menampilkan semua pengajuan beasiswa');
};

const getBeasiswaById = (req, res) => {
   const { id } = req.params;
   res.render('mahasiswa/upload', {
      beasiswa: {
         id,
         ipkTerakhir: 3.5,
         jenisBeasiswa: 'Prestasi',
         dokumen: 'dokumen.pdf',
      },
   });
};

const createBeasiswa = (req, res) => {
   res.send('Pengajuan beasiswa baru telah dibuat');
};

const updateBeasiswa = (req, res) => {
   const { id } = req.params;
   res.send(`Pengajuan beasiswa dengan ID: ${id} telah diperbarui`);
};

const deleteBeasiswa = (req, res) => {
   const { id } = req.params;
   res.send(`Pengajuan beasiswa dengan ID: ${id} telah dihapus`);
};

module.exports = {
   getBeasiswa,
   getBeasiswaById,
   createBeasiswa,
   updateBeasiswa,
   deleteBeasiswa,
};
