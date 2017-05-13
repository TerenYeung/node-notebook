/*
 * urlParser
 * 处理客户端数据
 */

 // request: query + body + method
// let context = {
// 	req: request,
// 	reqCtx: {},
// 	res: response,
// 	resCtx: {}
// }
const URL = require('url');

module.exports = (ctx)=>{

let { method, url, context } = ctx.req;
let { reqCtx } = ctx;

method = method.toLowerCase();
Object.assign(reqCtx, URL.parse(url, true), {method})


return Promise.resolve({
	then: (resolve,reject)=>{

		if(method == 'post'){
			let data = [];
			ctx.req.on('data', (chunk)=>{
				data.push(chunk);
				// console.log(data);
			}).on('end',()=>{

				let endData = Buffer.concat(data).toString();
				reqCtx.body = JSON.parse(endData);

				resolve();
			});
		}else {
			resolve();
		}

	}
})

}