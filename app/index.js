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
			let data = null;

			//对于不同的请求方式——script标签请求和ajax请求，分别处理
			if(url.match(/.action$/)) {
				data = apiServer(url);
				response.writeHead(200, 'resolve ok', {'Content-Type': 'application/json'});
				response.end(JSON.stringify(data));
			}else {
				data = staticServer(url);
				response.writeHead(200, 'resolve ok', {'X-powered-by': 'Node.js'});
				response.end(data);
			};


		}
	}
}

module.exports = App;