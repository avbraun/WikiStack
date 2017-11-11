var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:3007/wikistack');

const Page = db.define('pages', {
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
  },
})

const User = db.define('users', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})
