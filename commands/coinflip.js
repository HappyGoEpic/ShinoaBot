
const fs = require('fs');
const {MessageAttachment} = require('discord.js');

module.exports = {
    name:'coinflip',
    aliases: ['flipcoin','flipacoin','cointoss','coin','tosscoin','headsortails','headortail','cf'],

    execute(client, msg, args){
        var coins = fs.readdirSync(process.env.COINFLIP_HEADS_LOC).length;
        console.log("Number of coins",coins);
        var coin = checkCoin(coins);
        console.log("Selected coin",coin);
        var number = Math.floor(Math.random() * 501);
        console.log(number);
        if (number%2 != 0 && number!=0){
          var heads = new MessageAttachment(process.env.COINFLIP_HEADS_LOC+coin+'.png');
          rotatingMechanism('heads', coins);
          msg.reply("heads!",heads);
        }else if (number % 2 == 0 && number!=0){
          var tails = new MessageAttachment(process.env.COINFLIP_TAILS_LOC+coin+'.png');
          rotatingMechanism('tails', coins);
          msg.reply("tails!",tails);
        }else if (number == 0){
          var middle = new MessageAttachment(process.env.COINFLIP_MIDDLE_LOC+coin+'.png');
          msg.reply("middle?!?!?!",middle);
        }
    }
}

function checkCoin(coins){
  var coin = process.env.COINFLIP_CURRENT_COIN;
  if(coin == ''){
    coin = Math.floor((Math.random() * coins)+1);
    process.env['COINFLIP_CURRENT_COIN'] = coin;
    return coin;    
  }else{
    return process.env.COINFLIP_CURRENT_COIN;
  }
}
function rotatingMechanism(result, coins){
  console.log(result);
  if(result == 'heads'){
    process.env['COINFLIP_HEADS_GET'] = 'true';
  }else if(result == 'tails'){
    process.env['COINFLIP_TAILS_GET'] = 'true';
  }
  if(process.env.COINFLIP_HEADS_GET == 'true' && process.env.COINFLIP_TAILS_GET == 'true' ){
    console.log('Time to change coins!');
    process.env['COINFLIP_HEADS_GET'] = false;
    process.env['COINFLIP_TAILS_GET'] = false;
    if(parseInt(process.env.COINFLIP_CURRENT_COIN) < coins){
      process.env['COINFLIP_CURRENT_COIN'] = parseInt(process.env.COINFLIP_CURRENT_COIN) + 1;
    }else{
      process.env['COINFLIP_CURRENT_COIN'] = 1;
    }
  }
}