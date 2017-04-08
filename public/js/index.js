
setTimeout(function(){

	$.ajax({
		//因为ajax的get请求和使用script标签请求在表现上
		//没有什么区别，所以为了和script标签发起的请求有所区别，
		//发送ajax请求时为每一个请求路径的资源后缀添加action，即xxx.action
		url: '/blog.action',
		method: 'get',
		//有两种方式直接解析后端返回的数据，而不必使用JSON.parse;
		//1是直接在ajax的dataType选项中声明返回值为JSON
		//2是在后端的响应头中添加ContentType: application/json
		// dataType: 'JSON',
		success: function(arr){

			let data = arr.map(function(elem){
				return `<li>${elem.name}</li>`
			}).join('');

			$('#root').html(data);
			// console.log(typeof arr)
		},
		error: function(err){
			console.log(err);
		}
	});

	$.ajax({
		url: '/list.action',
		method: 'post',
		data: {
			id: 123
		},
		success: function(arr){

			let data = arr.map(function(elem){
				return `<li>${elem.name}</li>`
			}).join('');

			$('#list').html(data);
			// console.log(typeof arr)
		},
		error: function(err){
			console.log(err);
		}
	});

}, 1000)
