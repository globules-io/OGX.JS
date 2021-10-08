const path = require('path');
const fs = require('fs-extra');
const copy = require('recursive-copy');
const src_ogx = path.normalize(__dirname+'/ogx');
const src_www = path.normalize(__dirname+'/www');
const src_lib = path.normalize(__dirname+'/www/js/lib');
const src_main = path.normalize(__dirname+'/www/js/bin/main.js');
const dest_www = path.normalize(__dirname+'./../../../www');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
const dest_lib = path.normalize(__dirname+'./../../js/lib');
const dest_main = path.normalize(__dirname+'./../../js/bin/main.js');
//copy ogx folder
copy(src_ogx, dest_ogx, {overwrite:true});
//if no www, copy the whole folder
if(!fs.existsSync(dest_www)){
    copy(src_www, dest_www);
}else{
    //if www, check if js and js/lib already there
    if(!fs.existsSync(dest_lib)){
        copy(src_lib, dest_lib);
    }else{        
        //copy cryto, globules, howler, jquery, moment, mongogx
        let lib_folders = ['cryto', 'globules', 'howler', 'jquery', 'moment', 'mongogx'];
        let lib_folders_src;
        let lib_folders_dest;
        for(let i = 0; i < lib_folders.length; i++){
            lib_folders_src =  path.normalize(__dirname+'/www/js/lib/'+lib_folders[i]);
            lib_folders_dest = path.normalize(__dirname+'./../../js/lib/'+lib_folders[i]);
            copy(lib_folders_src, lib_folders_dest, {overwrite:true});
        }
    }
    //deploy main.js if not already there
    if(!fs.existsSync(dest_main)){
        fs.copyFile(src_main, dest_main);
    }
}
