fs = require('fs');

module.exports = {    
    loadAllNotes: function (){
        
        n = {};        
         fs.readdir("notes/", (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            
            //listing all files using forEach
            files.forEach((file) => {
                
                fs.readFile('notes/' + file, 'utf8', (err,data) => {
                    console.log(4);
                    if (err) {
                      return console.log(err);
                    }
                    var raw = data.split(">;$;<");
                    
                    if(n[raw[0]] == undefined){                
                        
                        n[raw[0]] = [];
                        n[raw[0]] = [raw[1]];
                        n[raw[0]].push(file);    
                        
                    }else{
                        n[raw[0]].push(raw[1]);
                        n[raw[0]].push(file);
                    }                    
                    
                  });                  
            });
        });
        
        return n;
    },

    saveNote: function (user,note){

        var raw = "";        
        
        for(var i = 2; i < note.length; i++){
            raw += note[i] + " ";            
        }

        fs.writeFile("notes/" + Date.now() +".txt", user + ">;$;<" + raw, function (err) {
            if (err) throw err;
            console.log('File is created successfully.'); 
        });

        return raw;
        
    },

    removeNote: function (file){
        fs.unlink('notes/' + file, function (err) {
            if (err) throw err;            
            console.log('File deleted!');
        });  
    }

} 

