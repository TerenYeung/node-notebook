/*
 * @author terenyeung
 * 4/4/2017
 */
const http = require('http');
const { PORT } = require('./config/config');
const App = require('./app');
const server = new App();

//中间件
const staticServer = require('./app/static-server');
const apiServer = require('./app/api-server');
const urlParser = require('./app/url-parser');

server.use(urlParser);
// console.dir(urlParser);
server.use(apiServer);
server.use(staticServer);
// console.dir(server.middlewareArr[2]())

//启动app
http.createServer(server.initServer()).listen(PORT,()=>{
	console.log(`server listening on port ${PORT}`)
});