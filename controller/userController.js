const user = require('../models/user');
const Fakultas = require('../models/fakultas');
const prodi = require('../models/programstudi');
const bcrypt = require('bcrypt');

// Nathan
exports.getUsers = async (req, res) => {
    try {
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
        const fakultasList = await Fakultas.findAll();
        const prodiList = await prodi.findAll();
        if (users) {
            res.render('administrator/users/updateUsers', { users: users, fakultasList: fakultasList, prodiList: prodiList, title: 'Update Users', message: req.query.message });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createUserPage = async (req, res) => {
    try {
        const fakultasList = await Fakultas.findAll();
        const prodiList = await prodi.findAll();
        res.render('administrator/users/addUsers', { fakultasList: fakultasList, prodiList: prodiList, title: 'Tambah Users', message: req.query.message })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }

}

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
// Nathan