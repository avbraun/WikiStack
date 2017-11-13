var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
module.exports = router;

router.get('/', function(req, res){
  res.render('index');
})


router.use('/wiki', wikiRouter);
router.use('/user', userRouter);


