const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('express');
const path = require('path');
const models = require('./models');

const router = require('./routes');

//nunjucks templating boilerplate
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off



//logging middleware
app.use(morgan('dev'));


//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


app.use(express.static(path.join(__dirname, '/public')));


//sync models
models.db.sync({force: true}) // force: true --> drops table and recreated to make changes. overwrites existing table
  .then(function() {
    app.listen(3000, function() {
      console.log('SQL is listening');
    });
  })
.catch(console.error);


//server start
var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});
