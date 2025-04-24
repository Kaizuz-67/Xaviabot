import axios from 'axios';

const config = {
    name: 'screenshot',
    aliases: ["ss"],
    version: '1.0',
    permissions: [2],
    credits: '@jm',
    description: 'take screenshot of url',
    usages: '[url]',
    cooldown: 5
};

const lang = {
    "en_US": {
        "noUrl": "provide url",
        "error": "error"
    },
    "vi_VN": {
        "noUrl": "nhập url",
        "error": "lỗi"
    }
};

async function onCall({ message, args, getLang }) {
    const url = args[0];
    if (!url) return message.reply(getLang("noUrl"));

    try {
        const api = `https://rapido.up.railway.app/api/screenshot?url=${encodeURIComponent(url)}`;
        const res = await axios.get(api, { responseType: 'stream' });
        
        message.reply({
            body: '',
            attachment: res.data
        });
    } catch {
        message.reply(getLang("error"));
    }
}

export default {
    config,
    langData: lang,
    onCall
};
