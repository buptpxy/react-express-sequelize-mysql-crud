'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique : true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'category_id'
    }
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'products',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    indexes: [{
      name: 'products_categoryId',
      method: 'BTREE',
      fields: ['category_id']
    }]
  });
};
