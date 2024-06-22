const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFiles = upload.fields([
   { name: 'transkripAkademik', maxCount: 1 },
   { name: 'suratRekomendasiDosen', maxCount: 1 },
   { name: 'suratPernyataanBeasiswa', maxCount: 1 },
   { name: 'suratPelengkap', maxCount: 1 },
]);

module.exports = uploadFiles;
