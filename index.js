const Discord = require('discord.js');
const { saveNote, loadAllNotes } = require('./data');
const bot = new Discord.Client();
const data = new require('./data');



const PREFIX = ">";

var notes = loadAllNotes();

bot.on('ready', () =>{
    console.log('This bot is online')
    console.log(notes);
})

bot.on('message', msg=>{
    var args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'n':
        case 'note':
            switch(args[1]){
                case 'a':
                case 'add':
                    var raw = saveNote(msg.author.tag, args);
                    notes[msg.author.tag].push(raw);
                    msg.reply("Added your new note!");
                    break;
                case 's':
                case 'show':
                    
                    if(notes[msg.author.tag]){
                        for(var i = 0; i < notes[msg.author.tag].length; i++){
                            msg.reply(i + ":  " + notes[msg.author.tag][i]);
                        }                           
                        
                    }else{
                        msg.reply("You do not have any notes open.");
                    }

                    break;

                case 'r':
                case 'remove':
                    notes[msg.author.tag].splice(args[2], 1);
                    msg.reply("Removed note NR." + args[2]);
                    
            }    
            
        
    }
})

bot.login(process.env.token);

