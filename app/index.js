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
			let staticFunc = (url)=>{
				if(url == '/'){
					url = '/index.html';
				}
				fs.readFile(`./public/${url}`,'utf8',(err,data)=>{
					response.end(data);
				})
			}
			staticFunc(url);
		}
	}
}
module.exports = App;