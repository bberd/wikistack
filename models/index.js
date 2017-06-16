var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false //doesn't output log on sync
});



var Page = db.define('page', {
  title: {
    type: Sequelize.STRING
  },

  urlTitle: {
    type: Sequelize.STRING
  },

  content: {
    type: Sequelize.TEXT
  },

  status: {
    type: Sequelize.ENUM('open', 'closed')
  }

});



var User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },

  email: {
    type: Sequelize.STRING
  }

});


module.exports = {
  Page,
  User
};
