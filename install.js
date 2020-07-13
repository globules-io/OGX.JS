const path = require('path');
const fs = require('fs-extra');
const src_ogx = path.normalize(__dirname+'/ogx');
const src_www = path.normalize(__dirname+'/www');
const dest_www = path.normalize(__dirname+'./../../../www');
const dest_ogx = path.normalize(__dirname+'./../../../ogx');
const check = path.normalize(__dirname+'./../../js/bin');
const dest_lib =  path.normalize(__dirname+'./../../js/lib/globules/ogx.min.js');
const src_lib = path.normalize(__dirname+'/www/js/lib/globules/ogx.min.js');
//Make ogx folder at root
try {
  if (!fs.existsSync(dest_ogx)){
    fs.mkdirSync(dest_ogx);
  }
} catch (err) {
  console.error(err);
}
//Make www folder at root
let clear = !fs.existsSync(check);
try {
  if (!fs.existsSync(dest_www)){
    fs.mkdirSync(dest_www);
  }else{
	//clear Cordova files on new install
	if(clear){
		fs.chmodSync(dest_www, 0777);
		fs.emptyDir(dest_www);
	}
  }
} catch (err) {
  console.error(err);
}
if(clear){
	//Move www content
	fs.copy(src_www, dest_www);
}else{
	//Update
	//remove old ogx files
	fs.remove(dest_ogx);
	//copy ogx to root
	fs.copy(src_ogx, dest_ogx);
	//remove old ogx.js
	fs.remove(dest_lib);
	//move new ogx.js
	fs.copy(src_lib, dest_lib);
}