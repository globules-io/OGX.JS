const path = require('path');
const copy = require('recursive-copy');
const src_www = path.normalize(__dirname+'/www');
const dest_www = path.normalize(__dirname+'./../../../www');
const src_ogx = path.normalize(__dirname+'/ogx');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
copy(src_www, dest_www, {overwrite:true});
copy(src_ogx, dest_ogx, {overwrite:true});