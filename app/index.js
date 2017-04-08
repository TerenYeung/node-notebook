//流式中间件
//请求 => url-parser => api-server => static-server

const fs = require('fs');
const { STATIC_PREFIX } = require('../config/config');

class App {

	constructor(){
		this.middlewareArr = [];
	}

	use(middleware){
		this.middlewareArr.push(middleware);
	}

	//创建Promise链条
	composeMiddleWare(){}

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
					headers: {},//响应头
					body: ''//响应体
				}
			}


			urlParser(context).then(()=>{
				return apiServer(context);
			}).then(()=>{
				return staticServer(context)
			}).then(()=>{

				let powered = {'X-powered-by': 'Node.js'};
				let { body, headers} = context.resCtx;
				//writeHeader默认hi覆盖setHeader的相同值；
				response.writeHead(200, 'OK', Object.assign(headers, powered));
				response.end(body);
			})
		}
	}
}

module.exports = App;