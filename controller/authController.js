const user = require('../models/user.js')
const bcrypt = require('bcrypt');

exports.dashboard = async (req, res) => {
    const users = await user.findAll();
    res.render('dashboard', { users: users, title: 'Admin' })
}

exports.loginPage = (req, res) => {
    res.render('login/login', { layout: false, message: req.query.message })
}

exports.forgetPass

exports.login = async (req, res) => {
    try {
        const users = await user.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!users) return res.redirect(`/?message=User tidak terdaftar`);
        const match = await bcrypt.compare(req.body.password, users.password);
        if (!match) return res.redirect(`/?message=Password Salah`);

        // res.session.userId = users.id;
        req.session.role = users.role;

        if (users.role === 'Admin') {
            return res.redirect('dashboard');
        } else if (users.role === 'Mahasiswa') {
            return res.redirect('mahasiswa/dashboard');
        } else if (users.role === 'Fakultas') {
            return res.redirect('fakultas/dashboard');
        } else if (users.role === 'Program Studi') {
            return res.redirect('prodi/dashboard');
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).redirect(`/?message=Mohon Login Ke Akun Anda`)
    }
    const users = await user.findOne({
        where: {
            email: req.session.userId
        }
    });
    if (!users) return res.redirect(`/?message=User tidak terdaftar`);
    res.status(200).json(user);
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json("Tidak dapat logout");
        res.status(200).redirect(`/?message=Anda Telah Logout`)
    })
}
