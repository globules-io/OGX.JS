const path = require('path');
const fs = require('fs-extra');
const src_ogx = path.normalize(__dirname+'/ogx');
const src_www = path.normalize(__dirname+'/www');
const src_lib = path.normalize(__dirname+'/www/js/lib/globules/ogx.min.js');
const dest_www = path.normalize(__dirname+'./../../../www');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
const dest_lib =  path.normalize(__dirname+'./../../js/lib/globules/ogx.min.js');

//Make ogx folder at root
try {
    if(!fs.existsSync(dest_ogx)){
        fs.mkdirSync(dest_ogx);
    }
} catch (err) {
    console.error(err);
}
try {
    if (!fs.existsSync(dest_www)){
        fs.mkdirSync(dest_www);        
    }
} catch (err) {
    console.error(err);
}	
//Folders
fs.readdir(src_www, (err, files) => {
    files.forEach(file => {
        if(!fs.existsSync(dest_www+'/'+file)){
            fs.copySync(src_www+'/'+file, dest_www+'/'+file);
        }else{
            console.log('File '+dest_www+'/'+file+' already exists, skipping');
        }
    });
})
//Update framework
//remove old ogx files
fs.removeSync(dest_ogx);
//copy ogx to root
fs.copySync(src_ogx, dest_ogx);
//remove old ogx.js
fs.removeSync(dest_lib);
//move new ogx.js
fs.copySync(src_lib, dest_lib);
