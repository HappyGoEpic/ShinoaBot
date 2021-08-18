const {Client, Collection} = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

function loadCommands (commandsDirectory){
    const commands = [];
    var totalcommands = 0;
    fs.readdirSync(commandsDirectory).forEach(command => commands.push(commandsDirectory+command));

    for (const command of commands){
      if(require.cache[require.resolve(command)]){
        delete require.cache[require.resolve(command)];
      } 
      const cmd = require(command);

      if('loadFirst' in cmd && !cmd.loadFirst()) continue;

      client.commands.set(cmd.name, cmd);
      console.log(cmd.name,'loaded!');
      if (cmd.aliases){
        for (const alias of cmd.aliases){
          client.aliases.set(alias, cmd.name);
        }
      }
      totalcommands++;
    }

    console.log(totalcommands +'/'+
    fs.readdirSync(commandsDirectory).length,
    'commands loaded!');
}

loadCommands(process.env.COMMANDS_LOC);

client.on('ready', () => {
  console.log("I live.")
})
.on('message',(msg)=> {
    console.log(msg.content);
    if (!msg.content.startsWith(process.env.PREFIX) && msg.content != process.env.STUBODOH_EMOTE) return;
    if (msg.author.bot) return;
    if (!msg.channel.type == 'text') return;
    console.log('Command passed all checks!');

    const messageSplit = msg.content.split(/\s+/g);
    var command = messageSplit[0].slice(process.env.PREFIX.length);
    var args = messageSplit.slice(1);
    console.log('Here',command,args);

    console.log(msg.content);
    if(msg.content === process.env.STUBODOH_EMOTE){
      console.log('Time for stubodoh protocol!');
      command = 'stubodohprotocol';
      args = [];
    }

    try{
        let cmd;
        if(client.commands.has(command)){
            cmd = client.commands.get(command);
        }else if (client.aliases.has(command)){
            cmd = client.commands.get(client.aliases.get(command));
        }

        if(!cmd) return;

        cmd.execute(client, msg, args);
    }
    catch (err){
        console.error(err);
    }
})
.on('voiceStateUpdate', (oldState, newState) => {
    try{
        if(oldState.channelID == null && newState.channelID != null){
          console.log(newState.member.user.username, 'has joined',newState.channel.name,'.');
          newState.member.roles.cache.forEach(role => console.log(role.name, role.members.size));
          //console.log(newState.member.roles.cache.has(role=> role.name = "Chinese"));
        }else if(oldState.channelID != null && newState.channelID == null){
          console.log(newState.member.user.username, 'has left',oldState.channel.name,'.');
        }else if(oldState.channelID !=null && newState.channelID != null){
          console.log(newState.member.user.username, 'has left',oldState.channel.name,'and joined',newState.channel.name);
        }
      }catch(error){
        console.log(error);
      }
});

client.login(process.env.BOT_TOKEN);