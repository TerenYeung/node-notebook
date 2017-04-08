/*
 * api Server
 *
 */
const { LIST, BLOG } = require('./api');
// console.log(BLOG)
module.exports = (request)=> {

	let { url , method, context} = request;

	//request => stream => eventEmitter

	//code logic
	let routes = {
		'/list.action': LIST,
		'/blog.action': BLOG
	};

	method = method.toLowerCase();

	if(method == 'get'){
		return Promise.resolve(routes[url]);
	}else {

		let { body } = context;

		return Promise.resolve(body);
	}



}