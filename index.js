const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const Sequelize = require('sequelize');
const pg = require('pg');
const pghstore = require('pg-hstore');
const models = require('./models');

var app = express();

app.get('/', function(req, res){
  res.render('index');
})

// app.get('/wiki/', function(req, res){
//   pages.findAll().then(function(pages){

//   })
// })

nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))

models.db.sync({force: true})
.then(function(){
  app.listen(3007, function(){
    console.log('hello, I am the server');
  });
})
.catch(function(err){console.error('failed on boot', err)});



