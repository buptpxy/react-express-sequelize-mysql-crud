var sequelize=require('./_db').sequelize();
var Products = sequelize.import('./products.js');
var Categories = sequelize.import('./categories.js');

// 建立模型之间的关系

Categories.hasMany(Products, {foreignKey:'category_id', targetKey:'id', as:'Products'});
Products.belongsTo(Categories);
// 同步模型到数据库中
sequelize.sync();

exports.Products = Products;
exports.Categories = Categories;
