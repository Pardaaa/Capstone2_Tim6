const { User: user } = require('../models');
const bcrypt = require('bcrypt');

// Nathan
exports.dashboard = async (req, res) => {
    const users = await user.findAll();
    let title = '';
    switch (req.session.role) {
        case 'Admin':
            title = 'Admin';
            break;
        case 'Fakultas':
            title = 'Fakultas';
            break;
        case 'Program Studi':
            title = 'Program Studi';
            break;
        case 'Mahasiswa':
            title = 'Mahasiswa';
            break;
        default:
            title = 'Guest';
    }
    res.render('dashboard', { users: users, title: `${title}` });
};

exports.loginPage = (req, res) => {
    res.render('login/login', { layout: false, message: req.query.message });
};

exports.login = async (req, res) => {
    try {
        const users = await user.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!users) return res.redirect('/?message=User tidak terdaftar');
        const match = await bcrypt.compare(req.body.password, users.password);
        if (!match) return res.redirect('/?message=Password Salah');

        req.session.userId = users.id;
        req.session.username = users.username;
        req.session.role = users.role;
        req.session.fakultas = users.fakultas_id;
        req.session.prodi = users.programStudi_id;

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.forgetPassPage = (req, res) => {
    res.render('login/forgetPass', { layout: false, message: req.query.message });
};

exports.forgetPass = async (req, res) => {
    const email = req.body.email;

    try {
        const foundUser = await user.findOne({
            where: {
                email: email
            }
        });

        if (foundUser) {
            res.redirect(`/recoPass?email=${email}`);
        } else {
            res.redirect(`/forgetPass?message=User tidak ditemukan`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.recoPassPage = (req, res) => {
    const email = req.query.email;
    res.render('login/recoverPass', { email, layout: false, message: req.query.message });
};

exports.recoPass = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.redirect(`/recoPass?email=${email}&message=Passwords tidak cocok`);
    }
    if (password.length < 8) {
        return res.status(400).redirect('/recoPass?message=Password minimal 8 karakter')
    }

    try {
        const foundUser = await user.findOne({
            where: {
                email: email
            }
        });

        if (foundUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            foundUser.password = hashedPassword;
            await foundUser.save();
            res.redirect('/?message=Password Berhasil Diubah, Silahkan melakukan Log in');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json("Tidak dapat logout");
        res.status(200).redirect('/?message=Anda Telah Logout');
    });
};
// Nathan