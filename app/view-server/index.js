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
const urlrewriteMap = require('./urlrewrite');

 module.exports = (ctx)=>{

 	let { req, resCtx } = ctx;
 	let { url } = req;

 	return Promise.resolve({
 		then: (resolve, reject)=>{

 			if(url.match(/\.action$/)) {
 				resolve()
 			}else {
	 			const viewPath = path.resolve(__dirname,'ejs');
	 			let ejsName = urlrewriteMap[url];

	 			if(ejsName){
	 				let htmlPath = path.resolve(viewPath,ejsName + '.ejs');
	 				let html = fs.readFileSync(htmlPath,'utf8');
	  				resCtx.headers = Object.assign(resCtx.headers,{
	 					'Content-Type': 'text/html'
	 				})
	 				resCtx.body = html;
	 				resolve()
	 			}else {
	 				//重定向功能
	  				resCtx.headers = Object.assign(resCtx.headers,{
	 					'Location': '/'
	 				});
	 				resCtx.statusCode = 302;
	 				resCtx.statusMsg = 'redirect'
	 				resCtx.body = '';
	 				resolve()
	 			}
 			};


 			// let urlMap = {
 			// 	'/': {
 			// 		viewName: 'index.html'
 			// 	},
 			// 	'about': {
 			// 		viewName: 'about.html'
 			// 	}
 			// };



 			// if(urlMap[url]){
 			// 	let { viewName } = urlMap[url];
 			// 	let _path = path.resolve(STATIC_PREFIX,viewName);
 			// 	// console.log(_path);

 			// 	resCtx.headers = Object.assign(resCtx.headers,{
 			// 		'Content-Type': mime.lookup(_path)
 			// 	})

	 		// 	let render = ejs.compile(fs.readFileSync(_path,'utf8'),{
	 		// 		compileDebug: true,
	 		// 	})

 			// 	resCtx.body = render({name: 'Teren'});
 			// 	resolve();
 			// }else {
 			// 	resolve();
 			// }

 			// urlMap[url]
 		}
 	})
 }