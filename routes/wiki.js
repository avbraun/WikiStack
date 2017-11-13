var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = router;

router.get('/', function(req, res, next){
  res.redirect('/');//retrieve all wiki pages
})

router.get('/add', function(req, res, next){
  res.render('addpage');  //retrieve the add a page form
})

router.post('/', function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save().then(function(savedPage){
    res.redirect(savedPage.route);
  }).catch(next);
  // .then(res.render('wikipage'))
    //submit a new page to the database
})

router.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(jsonFile){
    res.render('wikipage', jsonFile)
  })
  .catch(next);
})

