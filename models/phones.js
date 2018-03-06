'use strict';
module.exports = (sequelize, DataTypes) => {
  const phones = sequelize.define('phones', {
    vendor: DataTypes.STRING,
    model: DataTypes.STRING,
  }, {});
  phones.associate = function(models) {
    // associations can be defined here
  };
  return phones;
};
