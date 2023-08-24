const express = require('express');
const { engine } = require ('express-handlebars');

const app = express();
app.set('view engine', 'hbs');
app.engine('hbs', engine({layoutsDir: __dirname + '/views/layouts', extname : 'hbs'}));
const port = 3000;

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('main', {layout : 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));