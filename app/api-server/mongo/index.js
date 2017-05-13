/**
 * create model
 * @author teren
 * 17/5/13
 */
const mongoose = require('mongoose');
const { blogSchema, categorySchema } = require('./schema');

// first param is collection name
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('Category', categorySchema);

const $_saveBlog = blog => {
  return BlogModel.findOneAndUpdate({title:blog}, blog, {
    upsert: true
  }).exec()
    .then(_blog => {
      return {
        status: 1,
        data: _blog
      }
    })
}

const $_saveCategory = category => {
  return CategoryModel.findOneAndUpdate({
    name: category.name
  }, category,{
    upsert: true,
    new: true
  }).then(_category=>{
      return {
        status: 1,
        date: _category
      }
    })
}

module.exports = {
  $_saveBlog,
  $_saveCategory
}
