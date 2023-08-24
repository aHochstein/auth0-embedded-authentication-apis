const express = require('express');
const { engine } = require ('express-handlebars');
const cookieSession = require('cookie-session');
const config = require('./config.json');
const routerAuth = require('./routes/auth');


const app = express();
app.set('view engine', 'hbs');
app.engine('hbs', engine({layoutsDir: __dirname + '/views/layouts', extname : 'hbs'}));
const port = 3000;

app.use(cookieSession({
    name: 'session',
    keys: [config.cookieSecret],

    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('main', {layout : 'index', user: JSON.stringify(req.session.user)});
});

app.get('/session', (req, res) => {
    res.render('main', {layout : 'index'});
});

app.use(express.urlencoded({extended: false})); 
app.use('/', routerAuth);

app.listen(port, () => console.log(`App listening to port ${port}`));