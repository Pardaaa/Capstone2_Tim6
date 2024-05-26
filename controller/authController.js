const user = require('../models/user.js')
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
    res.render('login/login', { layout: false })
}

exports.forgetPass

exports.login = async (req, res) => {
    const users = await user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!users) return res.status(404).json("Email tidak terdaftar");
    const match = await bcrypt.verify(users.password, req.body.password);
    if (!match) return res.status(400).json("Wrong Password");
    res.session.userId = user.id;
    const id = user.id;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    const fakultas_id = user.fakultas_id;
    res.status(200).json({ id, username, email, role, fakultas_id });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json("Tidak dapat logout");
        res.status(200).json("Anda Telah Logout")
    })
}
