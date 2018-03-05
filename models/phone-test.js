'use strict';

const obj = {
  price: '349.00',
  'Марка': 'HTC',
  'МОДЕЛ': 'ONE A9S GREY',
  'РАЗМЕР НА ЕКРАНА В INCH': '5.0 "',
  'РАЗМЕР НА ЕКРАНА В СМ': '12.7 см',
  'ТЕХНОЛОГИЯ НА ДИСПЛЕЯ': 'SUPER LCD CAPACITIVE',
  'РЕЗОЛЮЦИЯ': '720X1280',
  'ПРОЦЕСОР': '2.0 GHz Octa-core',
  'ВГРАДЕНА ПАМЕТ': '32 GB',
  'RAM ПАМЕТ': '3 GB',
  'СВОБОДНА ПАМЕТ': '24 GB',
  'СЛОТ ЗА КАРТА С ПАМЕТ': 'YES',
  'ЗАДНА КАМЕРА': '13.0 MPx',
  'ПРЕДНА КАМЕРА': '5.0 MPx',
  'АВТО ФОКУС': 'YES',
  'СВЕТКАВИЦА': 'YES',
};

module.exports = (sequelize, DataTypes) => {
  const phone = sequelize.define('phones', {
  }, {});
  phone.associate = function(models) {
    
  };
  return phone;
};
