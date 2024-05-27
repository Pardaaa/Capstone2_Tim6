const user = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.render('administrator/users', { users: users, title: 'Users', message: req.query.message, action: req.query.action });
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
            res.render('administrator/updateUsers', { users: users, title: 'Update Users' });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.createUserPage = (req, res) => {
    res.render('administrator/addUsers', { title: 'Tambah Users' })
}

exports.createUser = async (req, res) => {
    const { username, email, password, confPassword, role, fakultas_id } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await user.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role,
            fakultas_id: fakultas_id
        });
        res.redirect('/users?message=Input Berhasil&action=success');
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
    const { username, email, password, confPassword, role, fakultas_id } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
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
            email: email,
            password: hashPassword,
            role: role,
            fakultas_id: fakultas_id
        }, {
            where: {
                id: users.id
            }
        });
        res.status(200).redirect('/users');
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
    if (!users) res.status(404).json("User tidka ditemukan");
    try {
        await user.destroy({
            where: {
                id: users.id
            }
        });
        res.status(200).redirect('/users');

    } catch (error) {
        res.status(400);
    }
}
