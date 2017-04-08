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
			if(url.match(/.action$/)) {

				apiServer(url).then(json=>{
					headers = {'Content-Type': 'application/json'};
					body = JSON.stringify(json);
					headers = Object.assign(headers, {'X-powered-by': 'Node.js'});

					response.writeHead(200, 'OK', headers);
					response.end(body);
					})
			}else {

				staticServer(url).then(body=>{
					headers = Object.assign(headers, {'X-powered-by': 'Node.js'});

					response.writeHead(200, 'OK', headers);
					response.end(body);

				});
			};
		}
	}
}

module.exports = App;