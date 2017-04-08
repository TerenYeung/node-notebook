
// Promise的状态

// new Promise((resolve,reject)=>{});

// - pending: 函数体什么也不调用;
// - fulfilled: 函数体调用resolve;
// - rejected: 函数体调用reject;

//Promise.prototype.then
//Promise.prototype.catch

// then和catch将里面的回调函数存入处理队列queue,
// 一直等到new Promise()的reoslve/reject方法调用后，才将对应
// 状态的回调函数执行；

/*

prtototype => then/catch

const promise = new Promise(resolve,reject=>{
	if(var a <1){
		resolve(a)
	}else{
		reject('error')
	}
})

promise.then(success=>{

},fail=>{

})

or

promies.then(success=>{

}).catch(fail=>{

})


*/

const p1 = new Promise((resolve, reject)=>{
	resolve(1)
});

// console.log(p1);

// p1.then(val=>{
// 	console.log(`promise1-1: ${val}`);
// 	return ++val;
// }).then(val=>{
// 	console.log(`promise1-2: ${val}`);
// 	return ++val;
// }).then(val=>{
// 	console.log(`promise1-3: ${val}`);
// })
/*
Promise { 1 }
promise1-1: 1
promise1-2: 2
promise1-3: 3
*/

// const p2 = Promise.resolve('success')
// p2.then(val=>{
// 	console.log(val)
// })

// const p3 = Promise.reject('fail');
// p3.catch(fail=>{
// 	console.log(fail)
// })

// const p4 = Promise.resolve({
// 	then: (resolve,reject)=>{
// 		resolve('success');
// 	}
// })
// p4.then(val=>{
// 	console.log(val)
// })

const p5 = new Promise((resolve,reject)=>{
	setTimeout(resolve, 1000, 'Hello World')
})
console.log(p5)

p5.then(val=>{
	console.log(val);
});
// Promise { <pending> }
// Hello World