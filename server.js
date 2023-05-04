const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');
const {
    handleCallMeMessage,
    handleAvoidCommandMessage,
    handleInfoProductMessage,
    handleQrisMessage,
    handlePaymentMethodMessage,
    handleWelcomeMessageInGroup,
    handleListProductMessage,
    handleBeliProductMessage,
} = require('./handler.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    await handleCallMeMessage(client, msg);
    await handleAvoidCommandMessage(client, msg);
    await handleInfoProductMessage(client, msg);
    await handleQrisMessage(client, msg);
    await handlePaymentMethodMessage(client, msg);
    await handleListProductMessage(client, msg);
    await handleBeliProductMessage(client, msg);
});

client.on('group_join', async notif => {
    await handleWelcomeMessageInGroup(client, notif);
});

client.initialize();