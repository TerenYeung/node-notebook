/*
 * @author terenyeung
 *	静态资源服务
 */
const fs =require('fs');
const path = require('path');
const { STATIC_PREFIX }= require('../../config/config');

let staticServer = (url)=>{

	return new Promise((resolve, reject)=>{

		if(url == '/'){
			url = '/index.html';
		};

		let _path = path.resolve(process.cwd(),`./${STATIC_PREFIX}${url}`);
		let data = null;

		data = fs.readFile(_path,(err, data)=>{

			if(err){
				reject(`NOT FOUND`);
			};

			resolve(data);

		})
	})
}

module.exports = staticServer;