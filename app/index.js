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
			fs.readFile('./public/index.html','utf8',(err,data)=>{
				response.end(data);
			})
		}
	}
}
module.exports = App;