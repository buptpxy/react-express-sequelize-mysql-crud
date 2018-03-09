'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Categories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique : true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {  
    timestamps: true,//时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
    underscored: true,//使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则，如：createdAt在数据库中的字段名会是created_at
      // paranoid: true,//虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'categories',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
};
