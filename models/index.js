var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      const route = this.getDataValue('urlTitle');
      return "/wiki/" + route
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  //open == status
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  hooks: {
    beforeValidate: function(page){
      if(page.title){
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    },
  }
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    isAlphanumeric: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  },
});


module.exports = {
  db: db,
  Page: Page,
  User: User
};


