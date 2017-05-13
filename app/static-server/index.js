/*
 * @author terenyeung
 *	静态资源服务
 */

const fs =require('fs');
const path = require('path');
const { STATIC_PREFIX }= require('../../config/config');
const mime = require('mime');

let staticServer = (ctx)=>{

	let { pathname } = ctx.reqCtx,
		{ resCtx } = ctx;

	return new Promise((resolve, reject)=>{

		if(!pathname.match(/\.action$/)){

			let _path = path.resolve(process.cwd(),`./${STATIC_PREFIX}${pathname}`);

			resCtx.headers = Object.assign(resCtx.headers,{
				'Content-Type': mime.lookup(_path)
			})
			// console.log(typeof mime.lookup(_path))
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