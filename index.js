const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzMwMTAwNzcwODkyMDIxNzgw.XwSlhA.DEd7saZuZ7CJQbTFXd4TVrj_1HE';

bot.on('ready', () =>{
    console.log('This bot is online')
})

bot.on('message', msg=>{
    if(msg.content === "Hello"){
        msg.reply('Baka');
    }
})

bot.login(token);

