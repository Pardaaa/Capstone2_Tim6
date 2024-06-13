module.exports = (req, res, next) => {
    if (req.session && req.session.username && req.session.role) {
        res.locals.username = req.session.username;
        res.locals.role = req.session.role;
    } else {
        res.locals.username = null;
        res.locals.role = null;
    }
    next();
};