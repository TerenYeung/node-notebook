/*
 * @author terenyeung
 * 4/4/2017
 */
const http = require('http');
const { PORT } = require('./config/config');
const App = require('./app');
const server = new App();

//中间件
const staticServer = require('./static-server');
const apiServer = require('./api-server');
const urlParser = require('./url-parser');

server.use(urlParser);
server.use(apiServer);
server.use(staticServer);

//启动app
http.createServer(server.initServer()).listen(PORT,()=>{
	console.log(`server listening on port ${PORT}`)
});