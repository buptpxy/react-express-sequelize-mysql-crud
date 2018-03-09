'use strict';

var Sequelize = require('sequelize');
var Transaction = require('sequelize').Transaction;

var sequelize = new Sequelize('pxy', 'root', '123456', {host: 'localhost', port:3306,dialect: 'mysql', logging:console.log});
var Products = sequelize.import('./products.js');
var Categories = sequelize.import('./categories.js');


sequelize.transaction(function (t) {
	// 在事务中执行操作
	return Categories.create({name: '生物学'}, {transaction:t})
	.then(function(category){
		return Products.create({categoryId: category.id, name:'遗传学',description:'高三教材',price: 50}, {transaction:t})
	});
}).then(function (results){
	/* 操作成功，事务会自动提交 */
}).catch(function(err){
  /* 操作失败，事件会自动回滚 */
});

