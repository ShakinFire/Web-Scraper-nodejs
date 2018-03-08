'use strict';
module.exports = (sequelize, DataTypes) => {
  const spec = sequelize.define('spec', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  spec.associate = function(models) {
    // associations can be defined here
  };
  return spec;
};
