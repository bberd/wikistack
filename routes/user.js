var express           = require('express');
var router            = express.Router();
var models            = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  User.findAll()
    .then(function(users) {
      res.render('user', { users: users });
    });
  });



router.get('/:id', function (req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (foundAuthor) {
    Page.findAll({
      where: authorId = req.params.id
    })
    .then(function(pages) {
      foundAuthor.dataValues.pages = pages;
      const authorData = foundAuthor.dataValues;
      console.log(authorData);
      res.render('user', authorData);
    })

  });
});






module.exports = router;
