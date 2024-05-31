const user = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.dashboard = (req, res) => {
    res.render('administrator/dashboard', { title: 'Admin' })
}

// Users Start
exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.render('administrator/users', { users: users, title: 'Users', message: req.query.message });
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
        if (users) {
            res.render('administrator/updateUsers', { users: users, title: 'Update Users', message: req.query.message });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createUserPage = (req, res) => {
    res.render('administrator/addUsers', { title: 'Tambah Users', message: req.query.message })
}

exports.createUser = async (req, res) => {
    const { username, fullName, email, password, confPassword, role, jabatan, fakultas_id, prodi_id } = req.body;
    if (password !== confPassword) {
        return res.status(400).redirect(`/createUsers?message=Password dan Confirm Password Tidak Cocok`);
    };
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await user.create({
            username: username,
            fullName: fullName,
            email: email,
            password: hashPassword,
            role: role,
            jabatan: jabatan,
            fakultas_id: fakultas_id,
            prodi_id: prodi_id
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
    const { username, fullName, email, password, confPassword, role, jabatan, fakultas_id, prodi_id } = req.body;
    const userId = req.params.id;
    if (password !== confPassword) {
        return res.status(400).redirect(`/updateUsers/${userId}?message=Password dan Confirm Password Tidak Cocok`);
    };
    try {
        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = users.password
        } else {
            hashPassword = await bcrypt.hash(password, 10);
        }
        await user.update({
            username: username,
            fullName: fullName,
            email: email,
            password: hashPassword,
            role: role,
            jabatan: jabatan,
            fakultas_id: fakultas_id,
            prodi_id: prodi_id
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

// Users End
