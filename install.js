const path = require('path');
const fs = require('fs-extra');
const copy = require('recursive-copy');
const src_www = path.normalize(__dirname+'/www');
const src_themes = path.normalize(__dirname+'/www/themes');
const src_bin = path.normalize(__dirname+'/www/js/bin');
const src_lib = path.normalize(__dirname+'/www/js/lib');
const root = require.main.paths[0].split('node_modules')[0].slice(0, -1);
const dest_www = path.normalize(root+'/www');
const dest_themes = path.normalize(root+'/www/themes');
const dest_lib = path.normalize(root+'/www/js/lib');
const dest_bin = path.normalize(root+'/www/js/bin');
//if no www, copy the whole folder
if(!fs.existsSync(dest_www)){
    copy(src_www, dest_www);
    console.log('Info: copying entire www folder');
}else{
    console.log('Info: www present, merging files...');
    //if www, check if js and js/lib already there
    if(!fs.existsSync(dest_lib)){
        console.log('Info: copying lib folder');    
        copy(src_lib, dest_lib);        
    }else{    
        console.log('Info: merging libraries...');           
        //copy cryto, globules, howler, jquery, moment, mongogx
        let lib_folders = ['cryto', 'globules', 'howler', 'jquery', 'moment', 'mongogx'];
        let lib_folders_src;
        let lib_folders_dest;
        for(let i = 0; i < lib_folders.length; i++){
            lib_folders_src =  path.normalize(src_lib+'/'+lib_folders[i]);
            lib_folders_dest = path.normalize(dest_www+'/js/lib/'+lib_folders[i]);
            //patch --dev
            if(fs.existsSync(lib_folders_src)){
                console.log('Info: merging lib', lib_folders[i]);
                copy(lib_folders_src, lib_folders_dest, {overwrite:true});
            }
        }  
        console.log('Info: done merging libraries');        
    }   
    //check if themes are here
    //patch --dev
    if(!fs.existsSync(dest_themes) && fs.existsSync(src_themes)){      
        console.log('Info: copying default theme');       
        copy(src_themes, dest_themes, {overwrite:false});        
    }
    //deploy js/bin if not already there
    //patch --dev
    if(!fs.existsSync(dest_bin) && fs.existsSync(src_bin)){         
        copy(src_bin, dest_bin, {overwrite:false});        
    } 
}
console.log('Info: OGX.JS install done!');