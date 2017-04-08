/*
 * @author terenyeung
 *	静态资源服务
 */
const fs =require('fs');
const path = require('path');
const { STATIC_PREFIX }= require('../../config/config');

let staticServer = (url)=>{

	if(url == '/'){
		url = '/index.html';
	}

	let _path = path.resolve(process.cwd(),`./${STATIC_PREFIX}${url}`);
	let resource = null;

	try{
		resource = fs.readFileSync(_path);
	}catch(err){
		resource = 'NOT FOUND';
	}

	return resource;
}

module.exports = staticServer;