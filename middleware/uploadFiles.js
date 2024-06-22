const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      const filetypes = /pdf/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
         return cb(null, true);
      } else {
         cb('Error: File upload only supports the following filetypes - ' + filetypes);
      }
   }
});

const uploadFiles = upload.fields([
   { name: 'transkripAkademik', maxCount: 1 },
   { name: 'suratRekomendasiDosen', maxCount: 1 },
   { name: 'suratPernyataanBeasiswa', maxCount: 1 },
   { name: 'suratPelengkap', maxCount: 1 },
]);

module.exports = uploadFiles;

module.exports = uploadFiles;
