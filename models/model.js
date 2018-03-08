'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('model', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {});
  model.associate = function(models) {
    const {
      vendor,
      spec,
      store,
    } = models;

    model.belongsTo(vendor, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    model.belongsToMany(store, {
      through: 'modelStore',
    });

    model.belongsToMany(spec, {
      through: 'modelSpec',
    });
  };
  return model;
};
