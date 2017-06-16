var express           = require('express');
var router            = express.Router();
var wikiRouter              = require('./wiki');
var userRouter              = require('./user');


module.exports = function something () {

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);


router.get('/', function (req, res, next) {
  res.send('GET IT');
});

router.get('/add', function (req, res, next) {

});

router.post('/add', function (req, res, next) {
  res.send('GET IT');
});






return router;
}
