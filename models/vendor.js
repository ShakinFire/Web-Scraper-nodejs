'use strict';
module.exports = (sequelize, DataTypes) => {
  const vendor = sequelize.define('vendor', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});
  vendor.associate = function(models) {
    // associations can be defined here
  };
  return vendor;
};
