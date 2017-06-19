const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const router = require('./routes');
const models = require('./models/index.js')

app.use(express.static(path.join(__dirname, '/public')));

//nunjucks templating boilerplate
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

//body parsing middleware - put up higher
app.use(bodyParser.urlencoded({extended: true})); //required for bodyParser
app.use(bodyParser.json());

//logging middleware
app.use(morgan('dev'));





app.use('/', router); //creates middleware. SHOULD BE LAST.







//sync models
models.User.sync({force: true}) // force: true --> drops table and recreated to make changes. overwrites existing table
  .then(function() {
    return models.Page.sync({ force: true})
  })
  .then(function() {
    app.listen(3000, function() {
      console.log('SQL is listening');
    });
  })
.catch(console.error);


//server start
app.listen(1337, function(){
  console.log('listening on port 1337');
});
