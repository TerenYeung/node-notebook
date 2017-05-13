/**
 * apply mongoose for dealinh with ajax
 * @author teren
 * 17/5/13
 */

let { $_saveBlog, $_saveCategory } = require('./mongo');

let Router = require('./router');
// 获取分类列表
Router.get('/categoryList.action',ctx=>{
  return {
    name: 'teren'
  }
})
// 增加分类
Router.get('/category.action',ctx=>{
  let category = ctx.reqCtx.query;
  return $_saveCategory(category);
})
//增加博客
Router.post('/blog.action',ctx=>{
  let blog = ctx.reqCtx.body;
  return $_saveBlog(blog);
})

module.exports = Router;