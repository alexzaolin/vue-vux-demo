/*axios*/
import axios from 'axios'
import api from './api.js'
import {util,cache} from '../utils/util.js'

var axiosFun = function(opt){
	/*
		opt:{
			method:"getUserInfo",
			data:data
		}
	*/
	var param = {

	}
	param = that.extend(true,param,opt);

	/*params 拼接在url后面的参数*/
	var third_session_obj = {
		"third_session": cache.getStorage("third_session")
	}
	var params = param.method.toLowerCase()==='get'?that.extend({},third_session_obj,param.data):third_session_obj;
	/*data是body里面的内容*/
	var data = param.method.toLowerCase()==='post'?JSON.stringify(param.data):null;
	var ajaxConfig = {
		method: param.method,
		url:"index.php?"+param.url,
		data:data,
		params: params,
		baseURL: that.apiPreUrl,
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
			that.login(self);
		}else if(data.code==20102){
			that.login(self);

		}else{
			that.alert(data.msg,false,self);
		}

	}).catch(function(err){
		typeof param.error == 'function' && param.error(err);
	});
}

export default = axios;
