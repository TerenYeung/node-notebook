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

	return Promise.resolve(routes[url]);
}