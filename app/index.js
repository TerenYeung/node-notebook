//流式中间件
//请求 => url-parser => api-server => static-server

const fs = require('fs');
const { STATIC_PREFIX } = require('../config/config');
const staticServer = require('./static-server');
const apiServer = require('./api-server');
const urlParser = require('./url-parser');

class App {

	constructor(){

	}

	use(){}

	initServer(){
		return (request,response)=>{

			let { url, method } = request;

			// let headers = {}, body = null;
			//对于不同的请求方式——script标签请求和ajax请求，分别处理

			request.context = {
				body: '',
				query: {},
				method: 'get'
			};

			urlParser(request).then(()=>{
				return apiServer(request)
			}).then(json=>{
				//路由控制，如果url在api中可以找到，则处理api逻辑
				//如果找不到，则证明请求的是静态资源，使用静态资源逻辑
				if(!json){
					return staticServer(request)
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
		}
	}
}

module.exports = App;