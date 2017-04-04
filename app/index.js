const fs = require('fs');
class App {
	constructor(){

	}
	use(){}
	initServer(){
		return (request,response)=>{
			//获取request对象的url和method
			let { url , method } = request;
			//如果url以.action结尾，认为它是ajax;

			//路由控制
			if(url == '/css/index.css'){
				fs.readFile('./public/css/index.css','utf8',(err,data)=>{
					response.end(data);
				})
			}else if(url == '/js/index.js'){
				fs.readFile('./public/js/index.js','utf8',(err,data)=>{
					response.end(data);
				})
			}else if(url == '/'){
				fs.readFile('./public/index.html','utf8',(err,data)=>{
					response.end(data);
				})
			}
		}
	}
}
module.exports = App;