const ejs = require('ejs');
const path = require('path');
// console.log(ejs)

//模板引擎的原理是new Function('a','b','return a+b')
const name = 'teren';
const html = `hello <%- name %>`;

// (name) => {return 'hello‘ + name }

const comp1 = ejs.compile(html);
// console.log(comp1);
const finalStr = comp1({
	name: name
});
// console.log(finalStr)

//Tags
/*
<%%> 逻辑运算
<%- %> unescape
<%= %> escape
<%- include() %> => fs.readFileSync('test')
*/

const html2 = `
	hello
	<% if(name.match('teren')){ %>
		<%= name %>

	<% } %>
	<%- include('test') %>
`
const result = ejs.compile(html2,{
	filename: path.resolve(__dirname,'./demo'),
	compileDebug: true,
})({name:name});
console.log(result);