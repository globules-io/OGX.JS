const fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');
const src_www = path.normalize(__dirname+'/www');
const dest_www = path.normalize(__dirname+'./../../../www');
const src_ogx = path.normalize(__dirname+'/ogx');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
const dest_cli = path.normalize(__dirname+'/cli.json');
const dest_index = path.normalize(__dirname+'./../../../www/index.html');
const dest_index_bak = path.normalize(__dirname+'./../../../www/index.bak');
const dest_app = path.normalize(__dirname+'./../../../www/app.json');
const dest_app_bak =  path.normalize(__dirname+'./../../../www/app.bak');
let app_exists = fs.existsSync(dest_app);
let index_exists = fs.existsSync(dest_index);
let copy_index = !index_exists;
if(fs.existsSync(dest_cli)){
    let cli_config = fs.readFileSync(dest_cli, 'utf-8');    
    if(cli_config.index !== 'index.html'){
        copy_index = false;
    }
}
if(!copy_index){
    fs.renameSync(dest_index, dest_index_bak);
}
if(app_exists){
    fs.renameSync(dest_app, dest_app_bak);
}
copy(src_www, dest_www, {overwrite:true});
copy(src_ogx, dest_ogx, {overwrite:true});
if(!copy_index){
    fs.renameSync(dest_index_bak, dest_index);
}
if(app_exists){
    fs.renameSync(dest_app_bak, dest_app);
}