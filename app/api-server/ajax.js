/**
 * apply mongoose for dealinh with ajax
 * @author teren
 * 17/5/13
 */

let { 
      $_saveBlog,
      $_saveCategory,
      $_getBlogDetail,
      $_getCategoryList,
      $_deleteBlog,
    } = require('./mongo');

let Router = require('./router');
// 获取分类列表
Router.get('/categoryList.action',ctx=>{
  return $_getCategoryList();
})

// 增加分类
Router.post('/category.action',ctx=>{
  let category = ctx.reqCtx.body;
  return $_saveCategory(category);
})
// 增加博客
Router.post('/blog.action',ctx=>{
  let blog = ctx.reqCtx.body;
  return $_saveBlog(blog);
})

// 博客详情页
Router.get('/blogDetail.action', ctx=>{
  let { query } = ctx.reqCtx;
  return $_getBlogDetail(query);
})

// 获取博客列表
Router.get('/blogList.action', ctx=> {
  let { query } = ctx.reqCtx;
  return $_getBlogList(query);
})

Router.post('/deleteBlog.action',ctx=>{
  let { body } = ctx.reqCtx;
  return $_deleteBlog(body);
})

module.exports = Router;