const router = require('express').Router();
const authApi = require('../apis/auth');


router.get('/login', function(req, res) {
    if(req.session.user) {
        return res.redirect('/');
    }
    res.render('login', {layout : 'index'});
});

router.post('/login', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await authApi.login(email, password);
    req.session.user = user;
    res.render('login', {layout : 'index'});
});

router.get('/signup', function(req, res) {
    if(req.session.user) {
        return res.redirect('/');
    }
    res.render('signup', {layout : 'index'});
});

router.post('/signup', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    await authApi.signUp(email, password);
    await authApi.login(email, password);
    req.session.user = user;
    res.redirect('/');
});


module.exports = router;