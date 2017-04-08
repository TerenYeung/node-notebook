/*
 * api Server
 *
 */
const { LIST, BLOG } = require('./api');
// console.log(BLOG)
module.exports = (ctx)=> {

	let { url ,method } = ctx.req,
		{ reqCtx, res, resCtx } = ctx;

	//request => stream => eventEmitter

	//code logic
	let routes = {
		'/list.action': LIST,
		'/blog.action': BLOG
	};

	method = method.toLowerCase();

	return Promise.resolve({
		then: (resolve, reject)=>{

			if(url.match(/\.action$/)){
				if(method == 'get'){
					resCtx.body = JSON.stringify(routes[url]);
				}else {
					let { body } = reqCtx;
					resCtx.body = JSON.stringify(body);
				}
				// res.setHeader('Content-Type', 'application/json');
				resCtx.headers = Object.assign(resCtx.headers, {
					'Content-Type': 'application/json'
				})
			}
			resolve();
		}
	})





}