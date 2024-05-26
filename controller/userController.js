const user = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.render('administrator/users', { users: users });
    } catch (error) {
        res.status(404).send('Users not found');
    }
};

exports.getUsersById = async (req, res) => {
    try {
        const response = await user.findOne({
            where: {
                id: req.param.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500);
    }
}
exports.createUser = async (req, res) => {
    const { username, email, password, confPassword, role, fakultas_id } = req.body;
    if (password !== confPassword) return res.status(400).req.json("Password dan Confirm Password tidak cocok");
    const hashPassword = await bcrypt.hash(password);
    try {
        await user.create({
            username: username,
            email: email,
            password: password,
            role: role,
            fakultas_id: fakultas_id
        });
        res.status(201).req.json("Input Berhasil");
    } catch (error) {
        res.status(400);
    }
}

exports.updateUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        if (users) {
            console.log(users);
            res.render('administrator/updateUsers', { users: users });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateUser = async (req, res) => {
    const users = await user.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!users) res.status(404).json("User tidka ditemukan");
    const { username, email, password, confPassword, role, fakultas_id } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = users.password
    } else {
        hashPassword = await bcrypt.hash(password);
    }
    if (password !== confPassword) return res.status(400).req.json("Password dan Confirm Password tidak cocok");
    try {
        await user.update({
            username: username,
            email: email,
            password: password,
            role: role,
            fakultas_id: fakultas_id
        }, {
            where: {
                id: users.id
            }
        });
        res.status(200).req.json("Update Berhasil");
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
        res.status(200).req.json("Delete Berhasil");
    } catch (error) {
        res.status(400);
    }
}
