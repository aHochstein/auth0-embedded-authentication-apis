var router = require('express').Router();

router.get('/login', function(req, res) {
    res.render('login', {layout : 'index'});
});

router.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    res.render('login', {layout : 'index'});
});

router.get('/signup', function(req, res) {
    res.render('signup', {layout : 'index'});
});

router.post('/signup', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    res.redirect('/');
});


module.exports = router;