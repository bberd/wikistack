var express           = require('express');
var router            = express.Router();
var wikiRouter        = require('./wiki');
var userRouter        = require('./user');


router.get('/', function (req, res, next) {
  console.log('in home page');
  res.send('hi mom!!');
});

router.use('/wiki', wikiRouter); // /wiki is a URI. not necessary to be an exact match due to the .use. and then goes to wikiRouter .use is a catch all, unlike .get and res.send, etc.
router.use('/user', userRouter);







module.exports = router;
