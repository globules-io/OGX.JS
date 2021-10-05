const fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');
const src_www = path.normalize(__dirname+'/www');
const dest_www = path.normalize(__dirname+'./../../../www');
const src_ogx = path.normalize(__dirname+'/ogx');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
let index_exists = fs.existsSync(dest_www+'/index.html');
let app_exists = fs.existsSync(dest_www+'/app.json');
if(index_exists){
    fs.renameSync(dest_www+'/index.html', dest_www+'/index.bak');
}
if(app_exists){
    fs.renameSync(dest_www+'/app.json', dest_www+'/app.bak');
}
copy(src_www, dest_www, {overwrite:true});
copy(src_ogx, dest_ogx, {overwrite:true});
if(index_exists){
    fs.unlinkSync(dest_www+'/index.html');
    fs.renameSync(dest_www+'/index.bak', dest_www+'/index.html');
}
if(app_exists){
    fs.unlinkSync(dest_www+'/app.json');
    fs.renameSync(dest_www+'/app.bak', dest_www+'/app.json');
}