const programStudi = require('../models/programstudi');
const fakultas = require('../models/fakultas');
const user = require('../models/user');

exports.getProdi = async (req, res) => {
    try {
        const prodi = await programStudi.findAll();
        res.render('administrator/programStudi/prodi', { prodi: prodi, title: 'Program Studi', message: req.query.message });
    } catch (error) {
        console.error(error)
        res.status(404).send('Program Studi not found');
    }
};

exports.viewProdi = async (req, res) => {
    try {
        const users = await user.findAll({ where: { fakultas_id: req.params.id } });
        const Fakultas = await fakultas.findAll({ where: { fakultas_id: req.params.id } });
        const prodis = await programStudi.findAll({ where: { fakultas_id: req.params.id } });
        res.render('administrator/programStudi/viewProdi', { users, Fakultas, prodis, title: 'Views Fakultas' });
    } catch (error) {
        console.error(error)
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

        const fakultasList = await Fakultas.findAll();
        res.render('administrator/programStudi/updateProdi', { prodi, fakultasList, title: 'Update Program Studi', message: req.query.message });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createProdiPage = async (req, res) => {
    try {
        const fakultasList = await Fakultas.findAll();
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
    try {
        const prodi = await programStudi.findOne({
            where: {
                id: req.params.id
            }
        });

        const { programStudi_id, namaProgramStudi, fakultas_id } = req.body;

        await prodi.update({
            programStudi_id: programStudi_id,
            namaProgramStudi: namaProgramStudi,
            fakultas_id: fakultas_id
        });

        res.status(200).redirect('/prodi?message=Update Berhasil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProdi = async (req, res) => {
    try {
        const prodi = await programStudi.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!prodi) {
            return res.status(404).send('Program Studi not found');
        }

        await prodi.destroy();

        res.status(200).redirect('/prodi?message=Delete Berhasil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Fakultas End