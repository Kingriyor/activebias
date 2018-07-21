/* eslint no-underscore-dangle:0 */

const config = require('../config/config');



class Main {
  constructor(mysql) {
      this.mysqlConn = mysql;
  }

}

module.exports = Main;
