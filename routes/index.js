var express = require('express');
var router = express.Router();
// 引用模型

var Products = require('../models').Products;
var Categories = require('../models').Categories;

/* 增加products */
router.post('/product/add', function(req, res, next) {
	var product = req.body;
	//console.log(product);
	Products.create({
		categoryId: product.categoryId,
		name:product.name,
		description:product.description,
		price: product.price
	}).then(function(result){
		console.log('result:'+JSON.stringify(result));
		if(JSON.stringify(result)!= "{}" ) {
	        result = {
	            code: 200,
	            msg:'增加成功'
	        };
        } else {
            result = {
	            code: 500,
	            msg:'未增加成功'
	        };
        }
		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});

//查询所有categories
router.get('/category/query',function(req,res,next){
	Categories.findAll().then(function(result){
  		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});
//查询一个category
router.post('/category/queryOne',function(req,res,next){
	var categoryId = req.body.id;
	Products.findOne({id: categoryId}).then(function(result){
		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});
//查询所有products
router.get('/product/queryAll',function(req,res,next){
	Products.findAll({include:[Categories]}).then(function(result){
		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});

//查询一个product
router.post('/product/queryOne',function(req,res,next){
	var productId = req.body.id;
	console.log(productId);
	Products.findOne({include:[Categories],where: {'id': productId}}).then(function(result){
		console.log(JSON.stringify(result));
		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});


//更新product
router.post('/product/edit', function(req, res, next){
	var param = req.body;
	var productId = param.id;
	Products.findById(productId).then(function(product){
		product.update(param);	
	}).then(function(result){
		if(JSON.stringify(result)!= "{}") {
	        result = {
	            code: 200,
	            msg:'更新成功'
	        };
        } else {
            result = void 0;
        }
		res.send(JSON.stringify(result));
	}).catch(function(err){
		console.log("error:"+err);
	});
});

// 删除 product
router.post('/product/delete', function(req, res, next){
	var productId = req.body.id;
	console.log(productId);
	Products.destroy({where:{id:productId}}).then(function(result){
		if(JSON.stringify(result) == 1) {
	        result = {
	            code: 200,
	            msg:'删除成功'
	        };
	    } else {
	        result = void 0;
	    }
		res.send(JSON.stringify(result));	
	}).catch(function(err){
		console.log("error:"+err);
	});
	// 使用模型实例删除
	// Products.findOne().then(function(user){
	// 	user.destroy();
	// 	res.set('Content-Type', 'text/html; charset=utf-8');
	// 	res.end('删除完成');	
	// }).catch(next);
});


module.exports = router;
