/*
 *
 *  处理cookie
 *
 */
const cookie_parser = require('cookie');
//设置白名单
const whiteNameList = ['/name_teren']
module.exports = (ctx) => {

  let {
    pathname
  } = ctx.reqCtx;
  let {
    cookie
  } = ctx.req.headers;
  let {
    res,
    resCtx
  } = ctx;
  let cookieObj = cookie_parser.parse(cookie || '');

  return Promise.resolve({
    then: (resolve, reject) => {

      //授权设置，在1小时内有效
      let cookieStr = time => `auth=true;Max-Age=${time}`;

      //对于授权用户允许显示写作tab
      if (cookieObj['auth']) {
        resCtx.hasUser = true;
        res.setHeader('Set-Cookie', cookieStr(3600));
      }
      //登录
      //如果用户在白名单，则授权写作权限
      if (whiteNameList.indexOf(pathname) > -1) {
        res.setHeader('Set-Cookie', cookieStr(3600));
      }
     //登出
      if (pathname == '/logout') {
        res.setHeader('Set-Cookie', cookieStr(0));
      }

      resolve();
    }
  })

}
