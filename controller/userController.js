const user = require('../models/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


exports.login = async (req, res) => {
    try {
        const user = await user.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "password salah" })
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCSESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
    } catch (error) {
        res.status(404).Json({ msg: "email tidak ditemukan" })
    }
};

exports.forgetPass = (req, res) => {
    res.render('login/forgetPass', { layout: false });
}

exports.recoverPass = (req, res) => {
    res.render('login/recoverPass', { layout: false });
}
