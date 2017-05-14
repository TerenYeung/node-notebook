/*
 * @author terenyeung
 * 4/4/2017
 */
const http = require('http');
const { PORT } = require('./config/config');
const App = require('./app');
const server = new App();

//中间件
const cookieParser = require('./app/cookie-parser');
const staticServer = require('./app/static-server');
const apiServer = require('./app/api-server');
const urlParser = require('./app/url-parser');
const viewServer = require('./app/view-server');
server.use(urlParser);
server.use(cookieParser);
// console.dir(urlParser);
server.use(apiServer);
server.use(staticServer);
server.use(viewServer);
// console.dir(server.middlewareArr[2]())

// 引入mongoose
const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog')
mongoose.connection.on('error',()=>{console.log('error for db');})
				.once('open', ()=> {console.log("\n we're connected to mongodb!")})



//启动app
http.createServer(server.initServer()).listen(PORT,()=>{
	console.log(`\n server listening on port ${PORT}`)
});