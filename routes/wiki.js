var express           = require('express');
var router            = express.Router();
var models            = require('../models');

var Page = models.Page;
var User = models.User;


router.get('/', function (req, res, next) {
  Page.findAll()
    .then(function(pages) {
      res.render('index', { pages: pages });
    })
});


router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage) {
    return foundPage.getAuthor()
      .then(function(author) {
        foundPage.dataValues.author = author;
        //.dataValues is the only part of foundPage with relevant data
        const pageData = foundPage.dataValues;
        res.render('wikipage', pageData);
      });

  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save()
      .then(function (page) {
          return page.setAuthor(user); //sets link/authorId in the Pages table, used in conjunction with findOrCreate and belongsTo
      });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(console.error);

});


module.exports = router;
