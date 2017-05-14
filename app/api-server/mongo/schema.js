/**
 * create schema
 * @author teren
 * 17/5/13
 */

const { Schema } = require('mongoose');

// create category schema
const categorySchema = new Schema({
  name: String,
  id: String
})

// create blog schema
const blogSchema = new Schema({
  title:  String,
  content: String,    // html
  rawContent: String, // markdown
  category: categorySchema,   // 博客分类
  date: String
}, {
  // _id为false相当于告诉mongoose不要操作_id
  _id: false,
  strict: false
})



module.exports = {
  blogSchema,
  categorySchema
}

