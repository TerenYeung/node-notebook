/**
 * create model
 * @author teren
 * 17/5/13
 */
const mongoose = require('mongoose');
const {
  blogSchema,
  categorySchema
} = require('./schema');

// first param is collection name
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('Category', categorySchema);

const $_saveBlog = blog => {
  let condition = { title: blog.title };
  blog.date = new Date().toLocaleString();

  return BlogModel.findOneAndUpdate(
    condition,
    blog, {
      upsert: true,
      new: true
    }
  ).then(_blog=>{
    return {
      status: 1,
      data: _blog
    }
  })
}

const $_saveCategory = category => {
  return CategoryModel
    .findOneAndUpdate({
        name: category.name
      }, category, {
      // update and insert
      upsert: true,
      // 默认insert，不返回数据；
      // 设置后，无论如何都返回数据
      new:  tru
      })
    .then(_category => {
      return {
        status: 1,
        data: _categroy
      }
    })
}

const $_getCategoryList = query => {
  return CategoryModel
    .find(query)
    .exec()
    .then(_categoryList => {
      return {
        status: 1,
        data: _categoryList || []
      }
    })
}

// get blog detail
const $_getBlogDetail = query => {
  let { id } = query;
  // 将string id 转化为 ObjectId
  id = mongoose.Types.ObjectId(id);

  return BlogModel.findOne({
    _id: id
  }).then(_blog=>{
    return {
      status: 1,
      data: _blog
    }
  })
}


const $_deleteBlog = query => {
  let condition = {
    _id: mongoose.Types.ObjectId(query.id)
  }
  return BlogModel
    .remove(condition)
    .exec()
    .then(_blog=>{
      return {
        status: 1,
        data: 'Delete Success'
      }
    })

}

module.exports = {
  $_saveBlog,
  $_saveCategory,
  $_getCategoryList,
  $_getBlogDetail
}