/**
 * create schema
 * @author teren
 * 17/5/13
 */

const { Schema } = require('mongoose');

// create blog schema
exports.blogSchema = new Schema({
  title:  String,
  content: String,    // html
  rawContent: String, // markdown
  category: String,   // 博客分类
  date: { type: Date, default: ()=>{
    return new Date().toocaleString();
    }
  }
});

// create category schema
exports.categorySchema = new Schema({
  name: String,
  id: String
})

