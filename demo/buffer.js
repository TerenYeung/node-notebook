const assert = require('assert');

const encodingTest = 'Hello World';

const buf1 = Buffer.from(encodingTest,'utf8');
// console.log(buf1);

const buf2 = Buffer.from([0x68,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64]);
// console.log(buf2.toString());

const test = `中文`;
const buf3 = Buffer.from(test);//<Buffer e4 b8 ad e6 96 87>
// console.log(buf3)

const buf4 = Buffer.from([0xe4]);
const buf5 = Buffer.from([0xb8]);
const buf6 = Buffer.from([0xad]);
// console.log(Buffer.concat([buf4,buf5,buf6]).toString());//中

const fs = require('fs');
let data = fs.createReadStream('./demo/tmp',{
	highWaterMark: 1,
	// highWaterMark: 3
});
let result = '';
data.on('data',(chunk)=>{
	//result = result.toString() + chunk.toString();
	result+=chunk;
}).on('end',()=>{
	console.log(result);
})

let result2 = [];
data.on('data',(chunk)=>{
	//result = result.toString() + chunk.toString();
	result2.push(chunk);
}).on('end',()=>{
	console.log(result2);
	let result3 = Buffer.concat(result2).toString();
	console.log(result3);
})
