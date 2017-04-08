const fs = require('fs');
const {STATIC_PREFIX} = require('../config/config');
const staticServer = require('./static-server');

class App {

	constructor(){

	}

	use(){}

	initServer(){
		return (request,response)=>{

			let { url , method } = request;
			let body = '';

			body = staticServer(url);

			response.end(body);
		}
	}
}

module.exports = App;