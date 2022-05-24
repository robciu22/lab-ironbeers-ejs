const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));


app.get('/', (req, res, next) => {
    res.render('index');
});

//let getBeers()
app.get('/beers', (req, res, next) => {
    res.render('beers');
    punkAPI.getBeers()
        .then(beersFromApi =>
            console.log('Beers from the database:', beersFromApi))
    res.render('beers', { beersFromApi })
        .catch(error => console.log(error))
})

app.get('/randomBeer', (req, res, next) => {
    res.render('randomBeer');
})


//Server started
app.listen(3001, () => console.log('🏃‍ on port 3001'));