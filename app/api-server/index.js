/*
 * api Server
 *
 */
const { LIST, BLOG } = require('./api');
// console.log(BLOG)
module.exports = url=> {

	//code logic
	let routes = {
		'/list.action': LIST,
		'/blog.action': BLOG
	}

	if(method == 'get'){
		return Promise.resolve(routes[url]);
	}else {
		//处理post请求
	}


}