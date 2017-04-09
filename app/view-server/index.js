/*
 * view-server
 *	@author terenyeung
 */

 //映射表
 //ejs动态渲染
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const ejs = require('ejs');
const { STATIC_PREFIX } = require('../../config/config');

 module.exports = (ctx)=>{

 	let { req, resCtx } = ctx;
 	let { url } = req;

 	return Promise.resolve({
 		then: (resolve, reject)=>{
 			let urlMap = {
 				'/': {
 					viewName: 'index.html'
 				},
 				'about': {
 					viewName: 'about.html'
 				}
 			};



 			if(urlMap[url]){
 				let { viewName } = urlMap[url];
 				let _path = path.resolve(STATIC_PREFIX,viewName);
 				// console.log(_path);

 				resCtx.headers = Object.assign(resCtx.headers,{
 					'Content-Type': mime.lookup(_path)
 				})

	 			let render = ejs.compile(fs.readFileSync(_path,'utf8'),{
	 				compileDebug: true,
	 			})

 				resCtx.body = render({name: 'Teren'});
 				resolve();
 			}else {
 				resolve();
 			}

 			// urlMap[url]
 		}
 	})
 }