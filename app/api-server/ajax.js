/**
 * apply mongoose for dealinh with ajax
 * @author teren
 * 17/5/13
 */

let Router = require('./router');
// 获取分类列表
Router.get('/categoryList.action',ctx=>{
  return {name: 'teren'};
})
// 增加分类
Router.get('/category.action',ctx=>{
  return {a: 1}
})
//增加博客
Router.post('/blog.action',ctx=>{

})

module.exports = Router;