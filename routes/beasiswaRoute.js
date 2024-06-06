// routes/beasiswaRouter.js
const express = require('express');
const {
   getBeasiswa,
   getBeasiswaById,
   createBeasiswa,
   updateBeasiswa,
   deleteBeasiswa,
} = require('../controller/beasiswaController.js');

const router = express.Router();

router.get('/mahasiswa', getBeasiswa);
router.get('/mahasiswa/:id', getBeasiswaById);
router.post('/mahasiswa', createBeasiswa);
router.put('/mahasiswa/:id', updateBeasiswa);
router.delete('/mahasiswa/:id', deleteBeasiswa);

module.exports = router;
