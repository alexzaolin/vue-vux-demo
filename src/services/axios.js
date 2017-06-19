/*axios*/
import axios from 'axios'
import api from './api.js'
import util from '../utils/util.js'
import storage from '../utils/storage.js'

var axiosFun = function(opt){
	/*
		opt:{
			method:"GET",
			url:"r=get-userinfo"
		}
	*/
	var param = {}
	param = util.extend(true,param,opt);

	/*params 拼接在url后面的参数*/
	var third_session_obj = {
		"third_session": storage.getStorage("third_session")
	}
	var params = param.method.toLowerCase()==='get'?util.extend({},third_session_obj,param.data):third_session_obj;
	/*data是body里面的内容*/
	var data = param.method.toLowerCase()==='post'?JSON.stringify(param.data):null;
	var ajaxConfig = {
		method: param.method,
		url:"index.php?"+param.url,
		data:data,
		params: params,
		baseURL: util.apiPreUrl,
		withCredentials:true,
		headers:{
			"Content-type":"application/json;charset=utf-8"
		},
		/*transformRequest: [function (data) {
			// 对 data 进行任意转换处理

			return data;
		}],
		transformResponse: [function (data) {
			// 对 data 进行任意转换处理

			return data;
		}],*/
		onUploadProgress: function (progressEvent) {
			// `onUploadProgress` 允许为上传处理进度事件
		},
		onDownloadProgress: function (progressEvent) {
			// `onDownloadProgress` 允许为下载处理进度事件
		}
	}
	return new Promise(function(resolve,reject){
		axios(ajaxConfig).then(function(res){
			var data = typeof res == 'string'?JSON.parse(res.data):res.data;

			if(data.code==0){
				resolve(res)
			}else if(data.code==20007){
				util.login(self);
			}else if(data.code==20102){
				util.login(self);

			}else{
				util.alert(data.msg,false);
			}

		}).catch(function(err){
			reject(err)
		});
	});

	return false;

	axios(ajaxConfig).then(function(res){
		var data = typeof res == 'string'?JSON.parse(res.data):res.data;
		if(typeof param.complete == 'function'){
			typeof data.data=='undefined'?param.complete():param.complete(data.data)
		}

		if(data.code==0){
			if(typeof param.success == 'function'){
				typeof data.data=='undefined'?param.success():param.success(data.data)
			}
		}else if(data.code==20007){
			util.login(self);
		}else if(data.code==20102){
			util.login(self);

		}else{
			util.alert(data.msg,false,self);
		}

	}).catch(function(err){
		typeof param.error == 'function' && param.error(err);
	});
}

export default axiosFun;
