const { User: User, Fakultas: fakultas, Programstudi: programStudi, PengajuanBeasiswa: ajuanBeasiswa, Beasiswa: beasiswa } = require('../models');

// Nathan
exports.getProdi = async (req, res) => {
    try {
        const prodi = await programStudi.findAll({
            include: fakultas,
            raw: true
        });
        const uniqueFakultas = [...new Set(prodi.map(p => p['Fakulta.namaFakultas']))];
        res.render('programStudi/prodi', {
            prodi: prodi,
            uniqueFakultas: uniqueFakultas,
            title: 'Daftar Program Studi',
            message: req.query.message
        });
    } catch (error) {
        console.error(error)
        res.status(404).send('Program Studi not found');
    }
};

exports.getMahasiswa = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                programStudi_id: req.session.prodi,
            }
        });
        const prodis = await programStudi.findOne({
            where: {
                id: req.session.prodi
            }
        })
        res.render('programStudi/daftarMahasiswa', {
            users: users,
            prodis: prodis,
            title: 'Daftar Mahasiswa',
            message: req.query.message
        })
    } catch (error) {

    }
}

exports.viewProdi = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                programStudi_id: req.params.id,
            }
        });
        const prodis = await programStudi.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('programStudi/viewProdi', { users, prodis, title: 'Views Program Studi' });
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
        const fakultasList = await fakultas.findAll();
        res.render('programStudi/updateProdi', { prodi, fakultasList, title: 'Update Program Studi', message: req.query.message });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createProdiPage = async (req, res) => {
    try {
        const fakultasList = await fakultas.findAll();
        res.render('programStudi/addProdi', { fakultasList: fakultasList, title: 'Tambah Program Studi', message: req.query.message })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
}

exports.createProdi = async (req, res) => {
    const { programStudi_id, namaProgramStudi, fakultas_id } = req.body;
    try {
        const exsistProdiId = await programStudi.findOne({ where: { programStudi_id: programStudi_id } });
        if (exsistProdiId) {
            return res.status(400).redirect('/prodi/create?message=ID Program Studi sudah digunakan');
        }
        const exsistNamaProdi = await programStudi.findOne({ where: { namaProgramStudi: namaProgramStudi } });
        if (exsistNamaProdi) {
            return res.status(400).redirect('/prodi/create?message=Nama Program Studi sudah digunakan');
        }
        await programStudi.create({
            programStudi_id: programStudi_id,
            namaProgramStudi: namaProgramStudi,
            fakultas_id: fakultas_id
        });
        res.redirect('/prodi?message=Input Berhasil');
    } catch (error) {
        console.error(error)
        res.status(400);
    }
}

exports.updateProdi = async (req, res) => {
    const prodi = await programStudi.findOne({
        where: {
            id: req.params.id
        }
    });
    const { programStudi_id, namaProgramStudi, fakultas_id } = req.body;
    const prodiId = req.params.id
    try {
        if (namaProgramStudi !== prodi.namaProgramStudi) {
            const exsistNamaProdi = await programStudi.findOne({ where: { namaProgramStudi: namaProgramStudi } });
            if (exsistNamaProdi) {
                return res.status(400).redirect(`/prodi/edit/${prodiId}?message=Nama Program Studi sudah digunakan`);
            }
        }
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

exports.listPengaju = async (req, res) => {
    try {
        const ajuan = await ajuanBeasiswa.findAll({
            include: [
                { model: beasiswa },
                {
                    model: User,
                    where: {
                        programstudi_id: req.session.prodi
                    }
                }
            ],
            raw: true
        });
        res.render('programStudi/listPengaju', { pengajuan: ajuan, title: "List Pengaju Beasiswa" });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the data.");
    }
}

exports.getAjuanById = async (req, res) => {
    try {
        const ajuan = await ajuanBeasiswa.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User,
                raw: true
            }
        });
        res.render('programStudi/dataPengaju', { pengajuan: ajuan, title: 'Update Program Studi', message: req.query.message });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewFile = async (req, res) => {
    const { id, type } = req.params;
    try {
        const ajuan = await ajuanBeasiswa.findByPk(id);
        if (ajuan) {
            const fileData = ajuan[type];
            if (fileData) {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename="file.pdf"');
                res.send(fileData);
            } else {
                res.status(404).send('File not found');
            }
        } else {
            res.status(404).send('Application not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
// Nathan