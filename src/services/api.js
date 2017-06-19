/*
	所有接口相关操作都集中在此，返回promise
*/
import axiosFun from './axios.js'


/**
    全局变量  当前环境，指测试服与正式服所使用的不同域名（接口）
            切换方法是在启动服务（npm run dev）或者打包构建（npm run build）
            的时候带上特有参数如  npm run dev-prod 为正式服
                               npm run dev      为测试服
                            npm run build-prod 同理
            见：package.json
*/

window.devEnv = process.devEnv;
var apiAddr = window.devEnv == "production-server" ? "" : "";
var origin = window.devEnv == "production-server" ? "" : "";

var api = {
	preUrl:'https://'+apiAddr, //接口地址的前缀
	apiPreUrl : 'https://'+origin,/*axios自己会多加一个斜杠，所以单独处理一个变量*/
	getUserInfo(){
		return new Promise(function(resolve,reject){
			resolve({
				'username':'alex'
			});
			/*axiosFun({
				method:"GET",
				url:"r=get-userinfo"
			})
			.then(function(res){
				resolve(res);
			})
			.catch(function(res){
				resolve(res);
			});*/
		});
	}
}
export default api;
