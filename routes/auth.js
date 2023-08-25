const router = require('express').Router();
const authApi = require('../apis/auth');


router.get('/login', function(req, res) {
    if(req.session.user) {
        return res.redirect('/');
    }
    res.render('login', {layout : 'index'});
});

router.get('/logout', function(req, res) {
    if(req.session.user) {
        delete req.session.user;
        return res.redirect('/');
    }
    res.render('login', {layout : 'index'});
});

router.post('/login', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const result = await authApi.login(email, password); 
    if(result.mfa_required) {
        req.session.mfaToken = result.mfa_token;
        return res.redirect('mfa');
    }
    req.session.user = result.user;
    res.redirect('/');
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
    const user =  authApi.login(email, password);
    req.session.user = user;
    res.redirect('/');
});

router.get('/mfa', function(req, res) {
    if(req.session.user) {
        return res.redirect('/');
    }
    res.render('mfa', {layout : 'index'});
});

router.post('/verify-otp', async function(req, res) {
    const otp = req.body.otp;
    const mfaToken = req.session.mfaToken;
    const user = await authApi.verifyWithOtp(otp,mfaToken);
    req.session.user = user;
    res.redirect('/');
});


module.exports = router;