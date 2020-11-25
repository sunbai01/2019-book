/**
 * @file 工具函数
 * @author sunbai
 */

/**   
 * @desc 网络请求封装，项目内请走这个封装
 * @params {object} [params] - 发请求用的参数
 * #@return {Promise} 请求的Promise任务对象
 */


export const request = params => {
	// 一行深拷贝代码 var newParams = JSON.parse(JSON.stringify(params)) 这里是浅拷贝，因为不用改东西
	// params.methods
	// 不要在代码里改引用，函数式编程
	// 看jsDoc 讲注释的，怎么规范写注释
	const requestParams = {
	   ...params,
	   method: ( params.method && params.method.toUpperCase() ) || 'GET'
	};
	// fetch 是promise 的 api ,返回的是promise对象
	// axios, 徒手， $.ajax
	return fetch (
		requestParams.url,
		requestParams
	)
	.then(res => res.json());

};


export const parseUrl= () => {
	window.name ='yuanxin';
	return url
}
