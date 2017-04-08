/*
 * @author terenyeung
 *	静态资源服务
 */

const fs =require('fs');
const path = require('path');
const { STATIC_PREFIX }= require('../../config/config');

let staticServer = (ctx)=>{

	let { url } = ctx.req,
		{ resCtx } = ctx;

	return new Promise((resolve, reject)=>{

		if(!url.match(/\.action$/)){
			if(url == '/'){
				url = '/index.html';
			};

			let _path = path.resolve(process.cwd(),`./${STATIC_PREFIX}${url}`);

			fs.readFile(_path,(err, data)=>{

				if(err){
					resCtx.body = `NOT FOUND`
				};
				resCtx.body = data;
				resolve();
			})
		}else {
			resolve();
		}
	})
}

module.exports = staticServer;