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
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
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
  }
});


module.exports = {
  db: db,
  Page: Page,
  User: User
};


