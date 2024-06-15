module.exports = (...roles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.role || !roles.includes(req.session.role)) {
            return res.redirect('/dashboard')
        }
        next();
    };
};