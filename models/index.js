var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false //doesn't output log on sync
});



var Page = db.define('page',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      isUrl: true
    },

    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  },

  {
    getterMethods: {
      route: function() {
        return '/wiki/' + this.urlTitle;
      }
    }
  }
);


Page.hook('beforeValidate', (page, options) => {
    if (page.title) {
      //remove all whitespace   and then all numeric
      page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      //create random title
      page.urlTitle = Math.random().toString(36).substring(2, 7);
    }
});


var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true
  }

});


module.exports = {
  Page,
  User
};
