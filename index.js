const Discord = require('discord.js');
const { saveNote, loadAllNotes, removeNote } = require('./data');
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
                    if(args[2]){
                        var raw = saveNote(msg.author.tag, args);
                        notes[msg.author.tag].push(raw);
                        msg.reply("Added your new note!");
                        break;
                    }else{
                        msg.reply("Correct use: note add <a text>");
                    }            
                case 's':
                case 'show':                    
                    msg.reply("Searching for notes...");
                    if(notes[msg.author.tag]){
                        let temp = "";
                        for(var i = 0; i < notes[msg.author.tag].length / 2; i++){
                            temp += i + ":  " + notes[msg.author.tag][i*2] + "\n";                            
                        }
                        msg.reply(temp);
                        
                    }else{
                        msg.reply("You do not have any notes open.");
                    }

                    break;

                case 'r':
                case 'remove':
                    if(args[2]){
                        let n = notes[msg.author.tag];
                        removeNote(n[args[2] * 2 + 1]);                  
                        notes[msg.author.tag].splice(args[2] * 2, 1);
                        notes[msg.author.tag].splice(args[2] * 2, 1);                    
                        msg.reply("Removed note NR." + args[2]);  
                    }else{
                        msg.reply("Correct use: note remove <number>");
                    }
                                                    
            }    
            
        
    }
})

bot.login("NzMwMTAwNzcwODkyMDIxNzgw.XwXE6g.crQbFt9Vgz4xJd9K8zkNcGdy3I8");

