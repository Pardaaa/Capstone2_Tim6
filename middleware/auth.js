// Nathan
module.exports = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.redirect('/?message=Mohon Login Ke Akun Anda');
    }
    next();
};
// Nathan
