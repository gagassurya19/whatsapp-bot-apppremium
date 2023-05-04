const {getProduct} = require('./getContext.js');

const splitAndTrim = (productList) => productList.split(',').map((product) => product.trim());

const upcomingProducts = splitAndTrim(getProduct('product_upcoming'));

const availableProducts = splitAndTrim(getProduct('product_available'));

const qris = ['qris', 'qr', 'qrcode'];

const paymentMethod = ['payment', 'bayar', 'cara bayar', 'cara pembayaran', 'pembayaran'];

const callMe = ['bot', 'apppremium', 'app premium', 'apppremiumbot', 'app premium bot', 'apppremium bot', 'app premiumbot'];

const list = ['list', '!list']

const beli = ['!beli', 'beli', 'order', 'pesan'];

const avoidCommand = [
    ...upcomingProducts, ...availableProducts, ...qris, ...paymentMethod
];

module.exports = {
    upcomingProducts,
    availableProducts,
    qris,
    paymentMethod,
    callMe,
    avoidCommand,
    list,
    beli,
};
