var express           = require('express');
var router            = express.Router();
var models            = require('../models');

var Page = models.Page;
var User = models.User;


router.get('/', function (req, res, next) {
  res.send("something");
});


router.get('/add', function (req, res, next) {
  res.render('addpage');
});



router.post('/', function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;

  let page = Page.build(
    {
      title: title,
      content: content
    }
  );

  page.save()
    .then(res.redirect('/'));

});




module.exports = router;
