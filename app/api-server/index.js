/*
 * api Server
 *
 */
const { LIST, BLOG } = require('./api');


// let Router = require('./router');
let router = require('./ajax');

module.exports = (ctx)=> {

 	let { resCtx,reqCtx } = ctx;
 	let { pathname } = reqCtx;
 	if(!pathname.match(/\.action/)){
 		//let it pass
 		return Promise.resolve()
 	}

	return Promise.resolve({
		then: (resolve, reject)=>{

			if(pathname.match(/\.action$/)){
				return router.routes(ctx).then(val=>{
					resCtx.body = JSON.stringify(val);
					resCtx.headers = Object.assign(resCtx.headers, {
						'Content-Type': 'application/json'
					})
					resolve();
				})
				// res.setHeader('Content-Type', 'application/json');
			}
			resolve();
		}
	})
}