const { User: user, Fakultas: Fakultas, Programstudi: prodi, Beasiswa: beasiswa } = require('../models');
const bcrypt = require('bcrypt');

// Nathan
exports.getUsers = async (req, res) => {
    try {
        beasiswa
        const users = await user.findAll();
        res.render('administrator/users/users', { users: users, title: 'Users', message: req.query.message });
    } catch (error) {
        res.status(404).send('Users not found');
    }
};

exports.getUsersById = async (req, res) => {
    try {
        const users = await user.findOne({
            where: {
                id: req.params.id
            }
        });
        const fakultasList = await Fakultas.findAll({
            include: [{ model: prodi, as: 'Programstudis' }]
        });
        if (users) {
            res.render('administrator/users/updateUsers', { users, fakultasList, title: 'Update Users', message: req.query.message });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createUserPage = async (req, res) => {
    try {
        const fakultasList = await Fakultas.findAll({
            include: [{ model: prodi, as: 'Programstudis' }]
        });
        res.render('administrator/users/addUsers', {
            fakultasList,
            title: 'Tambah Users',
            message: req.query.message
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createUser = async (req, res) => {
    const { userId, username, fullName, email, password, confPassword, role, jabatan, status, fakultas_id, programStudi_id } = req.body;
    if (password !== confPassword) {
        return res.status(400).redirect(`/users/create?message=Password dan Confirm Password Tidak Cocok`);
    };
    if (password.length < 8) {
        return res.status(400).redirect('/users/create?message=Password minimal 8 karakter')
    }

    try {
        const exsistuserId = await user.findOne({ where: { userId: userId } });
        if (exsistuserId) {
            return res.status(400).redirect('/users/create?message=User ID sudah digunakan');
        }
        const exsistEmail = await user.findOne({ where: { email: email } });
        if (exsistEmail) {
            return res.status(400).redirect('/users/create?message=Email sudah digunakan');
        }
        const exsistUserName = await user.findOne({ where: { username: username } });
        if (exsistUserName) {
            return res.status(400).redirect('/users/create?message=Username sudah digunakan');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await user.create({
            userId: userId,
            username: username,
            fullName: fullName,
            email: email,
            password: hashPassword,
            role: role,
            jabatan: jabatan,
            status: status,
            fakultas_id: fakultas_id,
            programStudi_id: programStudi_id
        });
        res.redirect('/users?message=Input Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.updateUser = async (req, res) => {
    const users = await user.findOne({
        where: {
            id: req.params.id
        }
    });
    const { userId, username, fullName, email, password, confPassword, role, jabatan, status, fakultas_id, programStudi_id } = req.body;
    const usersId = req.params.id;
    if (password !== confPassword) {
        return res.status(400).redirect(`/users/edit/${usersId}?message=Password dan Confirm Password Tidak Cocok`);
    };

    try {
        if (email !== users.email) {
            const existingEmail = await user.findOne({ where: { email: email } });
            if (existingEmail) {
                return res.status(400).redirect(`/users/edit/${usersId}?message=Email sudah digunakan`);
            }
        }

        if (username !== users.username) {
            const exsistUserName = await user.findOne({ where: { username: username } });
            if (exsistUserName) {
                return res.status(400).redirect(`/users/edit/${usersId}?message=Username sudah digunakan`);
            }
        }

        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = users.password
        } else if (password.length < 8) {
            return res.status(400).redirect(`/users/edit/${usersId}?message=Password minimal 8 karakter`)
        } else {
            hashPassword = await bcrypt.hash(password, 10);
        }

        await user.update({
            userId: userId,
            username: username,
            fullName: fullName,
            email: email,
            password: hashPassword,
            role: role,
            jabatan: jabatan,
            status: status,
            fakultas_id: fakultas_id,
            programStudi_id: programStudi_id
        }, {
            where: {
                id: users.id
            }
        });
        res.status(200).redirect('/users?message=Update Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.deleteUser = async (req, res) => {
    const users = await user.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        await user.destroy({
            where: {
                id: users.id
            }
        });
        res.status(200).redirect('/users?message=Delete Berhasil');

    } catch (error) {
        res.status(400);
    }
}

exports.getBeasiswa = async (req, res) => {
    try {
        const beasiswas = await beasiswa.findAll();
        res.render('administrator/beasiswa/beasiswa', { beasiswas: beasiswas, title: 'Beasiswa', message: req.query.message });
    } catch (error) {
        res.status(404).send('Users not found');
    }
}

exports.createBeasiswaPage = async (req, res) => {
    try {
        res.render('administrator/beasiswa/addBeasiswa', {
            title: 'Tambah Beasiswa',
            message: req.query.message
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createBeasiswa = async (req, res) => {
    const { namaBeasiswa, deskripsi, jenisBeasiswa } = req.body;
    try {
        await beasiswa.create({
            namaBeasiswa: namaBeasiswa,
            deskripsi: deskripsi,
            jenisBeasiswa: jenisBeasiswa
        });
        res.redirect('/beasiswa?message=Input Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.getBeasiswaById = async (req, res) => {
    try {
        const Beasiswa = await beasiswa.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('administrator/beasiswa/updateBeasiswa', { Beasiswa, title: 'Update Beasiswa', message: req.query.message });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.updateBeasiswa = async (req, res) => {
    const Beasiswa = await beasiswa.findOne({
        where: {
            id: req.params.id
        }
    });
    const { namaBeasiswa, deskripsi, jenisBeasiswa } = req.body;
    try {
        await beasiswa.update({
            namaBeasiswa: namaBeasiswa,
            deskripsi: deskripsi,
            jenisBeasiswa: jenisBeasiswa
        }, {
            where: {
                id: Beasiswa.id
            }
        });
        res.status(200).redirect('/beasiswa?message=Update Berhasil');
    } catch (error) {
        res.status(400);
    }
}

exports.deleteBeasiswa = async (req, res) => {
    const Beasiswa = await beasiswa.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        await beasiswa.destroy({
            where: {
                id: Beasiswa.id
            }
        });
        res.status(200).redirect('/beasiswa?message=Delete Berhasil');
    } catch (error) {
        res.status(400);
    }
}
// Nathan