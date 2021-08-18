const fs = require('fs');
const {MessageAttachment} = require('discord.js');

module.exports = {
    name: 'roll',
    aliases: ['roll','r'],

    execute(client, msg, args){
        var roll = 0;
        if(args.length >= 3){
            return;
        }
        if(args.length == 0){
            var selectedDice = pickDice('20');
            roll = Math.floor((Math.random() * 20)+1);
            msg.reply(roll);
            return;
        }
        if (!args.length == 0){
            var timesToRoll = 1;
            console.log(args.length);
            var selectedDice = pickDice(args[0]);
            console.log(selectedDice);
            if(args.length == 2){
                timesToRoll = args[1];
            }
            for(let i=0; i<timesToRoll; i++){
                roll = Math.floor((Math.random() * args[0]) + 1);
                msg.reply(roll)
            }
        }
    }
};
function pickDice(diceType){
    var dice = process.env.DICE_LOC+diceType+"/";
    return dice;
}
