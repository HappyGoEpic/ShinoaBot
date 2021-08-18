module.exports = {
    name: 'stubodohprotocol',

    execute(client, msg, args){
        msg.react('🇱')
        .then(() => msg.react('🇲'))
        .then(() => msg.react('🇦'))
        .then(() => msg.react('🇴'))
        .then(() => msg.react('👌'))
        .then(() => msg.react('🔥'))
        .catch(error => console.error('An emoji failed:', error));
    }
};