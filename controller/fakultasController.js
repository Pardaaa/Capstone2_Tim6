const fakultas = require('../models/fakultas');
const user = require('../models/user');
const prodi = require('../models/programstudi')

exports.getFakultas = async (req, res) => {
    try {
        const Fakultas = await fakultas.findAll();
        res.render('administrator/fakultas/fakultas', { Fakultas: Fakultas, title: 'Fakultas', message: req.query.message });
    } catch (error) {
        res.status(404).send('Fakultas not found');
    }
};

exports.viewFakultas = async (req, res) => {
    try {
        const users = await user.findAll({ where: { fakultas_id: req.params.id } });
        const prodis = await prodi.findAll({ where: { fakultas_id: req.params.id } });
        const Fakultas = await fakultas.findAll({ where: { fakultas_id: req.params.id } });
        res.render('administrator/fakultas/viewFakultas', { users, Fakultas, prodis, title: 'Views Fakultas' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.getFakultasById = async (req, res) => {
    try {
        const Fakultas = await fakultas.findOne({
            where: {
                id: req.params.id
            }
        });
        if (Fakultas) {
            res.render('administrator/fakultas/updateFakultas', { fakultas: Fakultas, title: 'Update Fakultas', message: req.query.message });
        } else {
            res.status(404).send('Fakultas not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createFakultasPage = (req, res) => {
    res.render('administrator/fakultas/addFakultas', { title: 'Tambah Fakultas', message: req.query.message })
}

exports.createFakultas = async (req, res) => {
    const { fakultas_id, namaFakultas } = req.body;
    try {
        await fakultas.create({
            fakultas_id: fakultas_id,
            namaFakultas: namaFakultas
        });
        res.redirect('/fakultas?message=Input Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.updateFakultas = async (req, res) => {
    const Fakultas = await fakultas.findOne({
        where: {
            id: req.params.id
        }
    });
    const { fakultas_id, namaFakultas } = req.body;
    try {
        await fakultas.update({
            fakultas_id: fakultas_id,
            namaFakultas: namaFakultas
        }, {
            where: {
                id: Fakultas.id
            }
        });
        res.status(200).redirect('/fakultas?message=Update Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.deleteFakultas = async (req, res) => {
    const Fakultas = await fakultas.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        await fakultas.destroy({
            where: {
                id: Fakultas.id
            }
        });
        res.status(200).redirect('/fakultas?message=Delete Berhasil');

    } catch (error) {
        res.status(400);
    }
}

// Fakultas End