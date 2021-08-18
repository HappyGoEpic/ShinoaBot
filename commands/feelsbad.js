const fs = require('fs');
const { type } = require('os');

module.exports = {
    name: 'feelsbad',
    aliases: ['feelsbadmusic','sadmusic'],

    execute(client, msg, args){
        var voiceChannel = msg.member.voice.channel;
        var feelsBadLength = fs.readdirSync(process.env.FEELSBAD_LOC).length;
        var audiofile = Math.floor((Math.random() * feelsBadLength)+1);
        console.log(audiofile);
        console.log(args.length);
        if(!args.length == 0){
            audiofile = args[0];
            console.log('Args exist',audiofile);
        }
        if(!voiceChannel){
        msg.reply(', please join a voice channel first c:')
        }else{    
            try{                
                voiceChannel.join().then(connection => {
                console.log(process.env.FEELSBAD_LOC+audiofile+'.mp3');
                const dispatcher = connection.play(process.env.FEELSBAD_LOC+audiofile+'.mp3');
                dispatcher.on("finish", end =>{
                    voiceChannel.leave();
                });
                });
            }catch(err){
                console.error(err)
            }
        }  
    }
};