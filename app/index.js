const fs = require('fs');
const { STATIC_PREFIX } = require('../config/config');
const staticServer = require('./static-server');
const apiServer = require('./api-server');

class App {

	constructor(){

	}

	use(){}

	initServer(){
		return (request,response)=>{

			let { url , method } = request;

			let headers = {}, body = null;
			//对于不同的请求方式——script标签请求和ajax请求，分别处理

			apiServer(url).then(json=>{
				//路由控制，如果url在api中可以找到，则处理api逻辑
				//如果找不到，则证明请求的是静态资源，使用静态资源逻辑
				if(!json){
					return staticServer(url)
				}else {
					return json
				}
			}).then(data=>{

				let powered = {'X-powered-by': 'Node.js'};

				//静态资源返回的是Buffer的实例
				if(typeof data == 'object' && !Buffer.isBuffer(data)){

					let headers = {'Content-Type': 'application/json'},
						json = JSON.stringify(data);

					let _headers = Object.assign(powered,headers);

					response.writeHead(200, 'OK', _headers);
					response.end(json);

				}else {

					response.writeHead(200, 'OK', powered);
					response.end(data);
				}
			})

			// if(url.match(/.action$/)) {

			// 	apiServer(url).then(json=>{
			// 		headers = {'Content-Type': 'application/json'};
			// 		body = JSON.stringify(json);
			// 		headers = Object.assign(headers, {'X-powered-by': 'Node.js'});

			// 		response.writeHead(200, 'OK', headers);
			// 		response.end(body);
			// 		})
			// }else {

			// 	staticServer(url).then(body=>{
			// 		headers = Object.assign(headers, {'X-powered-by': 'Node.js'});

			// 		response.writeHead(200, 'OK', headers);
			// 		response.end(body);

			// 	});
			// };
		}
	}
}

module.exports = App;