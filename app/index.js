//流式中间件
//请求 => url-parser => api-server => static-server

//优点
//1. 每一块中间件只需要关注修改context对象即可，彼此独立；
//2. 设计use和composeMiddleware这两个api用来创建Promise链；
//3. 开发者只需要关注中间件开发；

const { STATIC_PREFIX } = require('../config/config');
const staticServer = require('./static-server');

class App {

	constructor(){
		this.middlewareArr = [];
		this.middlewareChain = Promise.resolve();
	}

	use(middleware){
		this.middlewareArr.push(middleware);
	}

	//创建Promise链条
	composeMiddleware(context){
		//根据中间件数组，创建Promise链条
		let { middlewareArr } = this;
		for(let middleware of middlewareArr){
			this.middlewareChain = this.middlewareChain.then(()=>{
				return middleware(context)
			})
		}
		return this.middlewareChain
	}

	initServer(){
		return (request,response)=>{

			// let { url, method } = request;

			// // let headers = {}, body = null;
			// //对于不同的请求方式——script标签请求和ajax请求，分别处理

			// request.context = {
			// 	body: '',
			// 	query: {},
			// 	method: 'get'
			// };

			//因为我们的所有中间件都是处理request和response
			//所以可以把所有数据全部挂载在context对象上，
			//数据传递只需要传context就行了
			//用于中间件传递的request和response对象的封装
			let context = {
				req: request,
				reqCtx: {
					query: {},//处理客户端get请求
					body: '',//处理post请求的数据
				},
				res: response,
				resCtx: {
					statusCode: 200,
					statusMsg: 'OK',
					headers: {},//响应头
					body: ''//响应体
				}
			}


			this.composeMiddleware(context).then(()=>{
					let powered = {'X-powered-by': 'Node.js'};
					let { body, headers, statusCode, statusMsg } = context.resCtx;
					//writeHeader默认hi覆盖setHeader的相同值;


					response.writeHead(statusCode, statusMsg, Object.assign(headers, powered));
					response.end(body);
				})
		}
	}
}

module.exports = App;