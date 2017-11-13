const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const Sequelize = require('sequelize');
const pg = require('pg');
const pghstore = require('pg-hstore');
const models = require('./models');
const routes = require('./routes');

var app = express();

nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/', routes);

models.db.sync({})
.then(function(){
  app.listen(3007, function(){
    console.log('hello, I am the server');
  });
})
.catch(function(err){console.error('failed on boot', err)});



