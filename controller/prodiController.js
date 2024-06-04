const programStudi = require('../models/programstudi');
const fakultas = require('../models/fakultas');
const user = require('../models/user');

exports.getProdi = async (req, res) => {
    try {
        const prodi = await programStudi.findAll();
        res.render('administrator/programStudi/prodi', { prodi: prodi, title: 'Program Studi', message: req.query.message });
    } catch (error) {
        res.status(404).send('Program Studi not found');
    }
};

exports.viewProdi = async (req, res) => {
    try {
        const users = await user.findAll({ where: { fakultas_id: req.params.id } });
        const Fakultas = await fakultas.findAll({ where: { fakultas_id: req.params.id } });
        const prodis = await programStudi.findOne({ where: { fakultas_id: req.params.id } });
        res.render('administrator/programStudi/viewProdi', { users, Fakultas, prodis, title: 'Views Fakultas' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.getProdiById = async (req, res) => {
    try {
        const prodi = await programStudi.findOne({
            where: {
                id: req.params.id
            }
        });
        if (prodi) {
            res.render('administrator/programStudi/updateProdi', { prodi: prodi, title: 'Update Program Studi', message: req.query.message });
        } else {
            res.status(404).send('Program Studi not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createProdiPage = async (req, res) => {
    try {
        const fakultasList = await fakultas.findAll();
        res.render('administrator/programStudi/addProdi', { fakultasList: fakultasList, title: 'Tambah Program Studi', message: req.query.message })
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createProdi = async (req, res) => {
    const { programStudi_id, namaProgramStudi, fakultas_id, namaFakultas } = req.body;
    try {
        await programStudi.create({
            programStudi_id: programStudi_id,
            namaProgramStudi: namaProgramStudi,
            fakultas_id: fakultas_id,
            namaFakultas: namaFakultas
        });
        res.redirect('/prodi?message=Input Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.updateProdi = async (req, res) => {
    const prodi = await programStudi.findOne({
        where: {
            id: req.params.id
        }
    });
    const { programStudi_id, namaProgramStudi, fakultas_id, namaFakultas } = req.body;
    try {
        await programStudi.update({
            programStudi_id: programStudi_id,
            namaProgramStudi: namaProgramStudi,
            fakultas_id: fakultas_id,
            namaFakultas: namaFakultas
        }, {
            where: {
                id: prodi.id
            }
        });
        res.status(200).redirect('/prodi?message=Update Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.deleteProdi = async (req, res) => {
    const prodi = await programStudi.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        await prodi.destroy({
            where: {
                id: prodi.id
            }
        });
        res.status(200).redirect('/prodi?message=Delete Berhasil');
    } catch (error) {
        res.status(400);
    }
}

// Fakultas End