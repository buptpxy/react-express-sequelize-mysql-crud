'use strict';

var Sequelize = require('sequelize');

exports.sequelize = function () {
	return new Sequelize('pxy', 'root', '123456', {host: 'localhost', port:3306, dialect: 'mysql',logging:console.log});
}
