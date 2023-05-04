const { MessageMedia } = require('whatsapp-web.js');
const { getMenuText, getProduct, getImageContext } = require('./utilities/getContext.js');
const { upcomingProducts, availableProducts, qris, paymentMethod, callMe, avoidCommand, list, beli } = require('./utilities/queryCommand.js');
const { countMessages } = require('./utilities/countMessages.js');

const mainMenuText = getMenuText('menu_main');
const aboutText = getMenuText('about');
const paymentMethodText = getMenuText('payment_method');
const productListText = getMenuText('menu_product_list');

const handleCallMeMessage = async (client, msg) => {
    const info = await msg.getInfo();
    if(callMe.includes(msg.body.toLowerCase()) && info.id.remote.server == "g.us") {
        const contact = await msg.getContact();
        await msg.reply(`Halo kak ${contact.pushname}, ada yang bisa dibantu?\n\n${mainMenuText}`);
        countMessages();
    }
};

const handleAvoidCommandMessage = async (client, msg) => {
    const info = await msg.getInfo();
    if(!avoidCommand.includes(msg.body.toLowerCase()) && info.id.remote.server == "c.us") {
        const contact = await msg.getContact();
        await client.sendMessage(contact.id._serialized, `Halo kak, selamat datang di *AppPremium*!\n${aboutText}\n${mainMenuText}`);
        countMessages();
    }
};

const handleListProductMessage = async (client, msg) => {
    const contact = await msg.getContact();
    const info = await msg.getInfo();
    if(list.includes(msg.body.toLowerCase()) && info.id.remote.server == "g.us") {
        await msg.reply(`Halo kak ${contact.pushname}, ini dia daftar produk kami:\n${productListText}`);
        countMessages();
    }
};

const handleInfoProductMessage = async (client, msg) => {
    const contact = await msg.getContact();
    const info = await msg.getInfo();
    const productName = msg.body.toLowerCase();
    if (upcomingProducts.includes(productName)) {
        if (availableProducts.includes(productName)) {
            const product = getProduct(productName);
            await msg.reply(`Halo kak ${contact.pushname}, ini dia daftar harga ${productName} kami:\n\n${product}\n\nUntuk membeli berikan perintah:\ncth: *!beli ${productName} 1bulan sharing*`);
            countMessages();

            // client.sendMessage(contact.id._serialized, `Halo kak ${contact.pushname}, ini dia daftar harga ${productName} kami:\n\n${product}`);
            // if(info.id.remote.server == "g.us") {
            //     msg.reply(`Kak ${contact.pushname}, cek chat ya kak! wa.me/message/K53OLKIGZNBYA1`);
            // }
        } else {
            await msg.reply(`Produk "${productName}" belum tersedia/stok kosong.\n\nDaftar produk yang tersedia:\n${productListText}`);
            countMessages();
        }
    } 
};

const handleBeliProductMessage = async (client, msg) => {
    const [command, product, ...details] = msg.body.split(' ');
    if(beli.includes(command) && product){
        if(!productListText.includes(product)) {
            await msg.reply(`Produk "${product}" tidak tersedia.\n\nDaftar produk yang tersedia:\n${productListText}`);
            countMessages();
        } else {
            const info = await msg.getInfo();
            const contact = await msg.getContact();
            if(info.id.remote.server == "g.us") {
                await msg.reply(`${contact.pushname}, Order berhasil!\nDetail order telah terkirim ke private chat.\nSilahkan lakukan pembayaran sesuai dengan paket yang dipilih dan kirim buktinya dengan caption *!bayar*\n\n${paymentMethodText}\n\nType: qris untuk pembayaran menggunakan qris.\nUntuk info lebih lanjut, silahkan hubungi admin ya kak!`);
                countMessages();
            }
        }    
    }
};

const handleQrisMessage = async (client, msg) => {
    if (qris.includes(msg.body.toLowerCase())) {
        const image = new MessageMedia('image/png', getImageContext('qris'));
        const caption = 'Payment Method: QRIS\n\nScan QRIS diatas untuk pembayaran.\n\nUntuk info lebih lanjut, silahkan hubungi admin ya kak!';
        await msg.reply(image, undefined, { caption: caption });
        countMessages();
    }
};

const handlePaymentMethodMessage = async (client, msg) => {
    const contact = await msg.getContact();
    const group = await msg.getChat();
    if (paymentMethod.includes(msg.body.toLowerCase())) {
        const message = `Halo kak ${contact.pushname}, ini dia cara pembayaran di ${group.name}:\n\n${paymentMethodText}\n\nType: qris untuk pembayaran menggunakan qris.\nUntuk info lebih lanjut, silahkan hubungi admin ya kak!`;
        await msg.reply(message);
        countMessages();
    }
};

const handleWelcomeMessageInGroup = async (client, msg) => {
    const group = await msg.getChat();
    const textSend = `Haloo, warga ${group.name.toLocaleUpperCase()}!\n\n${aboutText}\n${mainMenuText}`;
    await group.sendMessage(textSend);
    countMessages();
};
 
module.exports = {
    handleCallMeMessage,
    handleAvoidCommandMessage,
    handleInfoProductMessage,
    handleQrisMessage,
    handlePaymentMethodMessage,
    handleWelcomeMessageInGroup,
    handleListProductMessage,
    handleBeliProductMessage
}