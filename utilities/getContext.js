const { getText, getImage } = require("../helper/getFile.js");

const getMenuText = menu => getText('info', menu, 'txt');
const getProduct = productName => getText('data_product', productName, 'txt');
const getImageContext = fileName => getImage('image', fileName, 'jpg');
const getCommand = command => getText('command', command, 'txt');

module.exports = {
  getMenuText,
  getProduct,
  getImageContext,
  getCommand
};
