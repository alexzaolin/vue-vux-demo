/**
    util 为项目的常用工具方法集合，该对象在任一组件内import后均可使用;
*/
var util = {
    app:null,
    initAppObj:function(obj){
        this.app = obj;
    },
    loading: function() {
        /*全局loading开始*/

    },
    loaded: function(callback) {
        /*全局loading结束*/
    },
    alert(msg){
        alert(msg);
    },
    confirm:function(msg,success,error){
        var r = confirm(msg);
        if(r){
            success&&success();
        }else{
            error&&error();
        }
    },
    getRequest:function() {
        //获取url中所附带的参数
        var url = location.search;
        var theRequest = new Object();

        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    addZero:function(msg){
        /*给时间加0，保证最少两位数*/
        return ("0"+msg).slice(-2);
    },
    formatDate:function(time,type,noHandle){
        /*时间戳 转换为 日期格式*/
        if(!time||time==''||time==0){
            //var date = new Date();
            return '未知时间'
        }else{
            var date = noHandle ? new Date(time):new Date(time*1000);
        }
        if(type == 'day'){
            return date.getFullYear()+"-"+util.addZero(date.getMonth()+1)+"-"+util.addZero(date.getDate());
        }else{
            return date.getFullYear()+"-"+util.addZero(date.getMonth()+1)+"-"+util.addZero(date.getDate())+
            " "+util.addZero(date.getHours())+":"+util.addZero(date.getMinutes())/*+":"+util.addZero(date.getSeconds())*/;
        }
    },
    parseTime:function(time){
        /*
            日期格式 转换为 时间戳
            这里的time为标准时间格式
        */
        if(time==''){
            return ''
        }else{
            return !!time?parseInt((new Date(time)).getTime()/1000):parseInt((new Date()).getTime()/1000);
        }
    },
    getCurDayTime(date){
        /*获取某一天的第一秒，和最后一秒的时间*/

        var start_time = parseInt((new Date((new Date(date)).toLocaleDateString())).getTime()/1000);
        var end_time = start_time + 1*24*3600 -1;
        return {
            start_time:new Date(start_time*1000),
            end_time:new Date(end_time*1000)
        }
    },
    getTimeArea(day,fromDate,containToday){
        /*获取时间段的时间戳，返回开始时间和结束时间*/

        //fromDate:目标日期的时间 2017/03/28，默认当天的前day天 ---没有任何参数即为前一天时间段
        //因项目需求，该时间计算均往前推一天
        var day = day ? day : 1;//多少天的时间差，默认一天
        var fromDate = fromDate?fromDate:new Date();
        fromDate = containToday?fromDate:new Date(new Date(new Date(fromDate).toLocaleDateString()).getTime()-24*3600)
        /*如果没有输入起算时间，那就默认为今天*/
        var end_time = new Date(new Date(new Date(fromDate).toLocaleDateString()).getTime()+24*3600*1000-1)

        var start_time = parseInt(end_time.getTime()/1000) - day*24*3600 +1;

        return {
            start_time : start_time,
            end_time : parseInt(end_time.getTime()/1000)
        }
    },
    is:function(o, type) {
        var isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1}
        type = type.toLowerCase();

        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(2)   -> false
        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(NaN) -> true
        if (type == "finite") {
            return !isnan["hasOwnProperty"](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
        (type == typeof o && o !== null) ||
        (type == "object" && o === Object(o)) ||
        (type == "array" && Array.isArray && Array.isArray(o)) ||
        Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
    },
    isEmpty:function(value){
        if(value === undefined){return true;}
        return (Array.isArray(value) && value.length === 0)
                || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
    },
    arrContain:function(arr,obj){
        /**
         * 检测数组包含关系
         */
        var index = arr.length;
        while (index--) {
            if (arr[index] === obj) {
                return true;
            }
        }
        return false;
    },
    arrRemove:function(arr,obj,newObj){
        /**
         * 数组删除元素
         * arr 数组
         * obj 要删除的元素
         * newObj 要替换的元素
         */
        var index = arr.indexOf(obj);
        if (isNaN(index) || index>= arr.length) { return false; }
        if(newObj){
            arr.splice(index, 1 , newObj);
        }else{
            arr.splice(index, 1);
        }

        return arr
    },
    getCurrentTimeStamp: function() {
        return Date.parse(new Date()) / 1000;
    },
    urlToBase64(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    },
    /*表单验证公共方法*/
    validator:function(string,type){
        switch (type) {
            case "id" : // ID 字母、数字、下划线组成 6-20
                return /^(\w){4,20}$/.test(string);
            case "password" : // 密码
                return /^(\S){6,20}$/.test(string);
            case "trade_password" : // 交易密码
                return /^(\S){6}$/.test(string);
            case "md5password" : // MD5密码
                return /^(\S){32}$/.test(string);
            case "chinese" : // 中文
                return /[\u4e00-\u9fa5]/.test(string);
            case "telephone" : // 国内座机电话号
                return /\d{3}-\d{8}|\d{4}-\d{7,8}/.test(string);
            case "mobilePhone"://手机号
                return /^[1][3578][0-9]{9}$/.test(string);
            case "qq" : // QQ号
                return /^[1-9][0-9]{4,}$/.test(string);
            case "numberInteger" : // 整形数字
                return /^[-+]?[1-9]\d*\.?[0]*$/.test(string);
            case "numberFloat" : // 浮点型数字
                return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(string);
            case "email" : // email
                return /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(string);
            case "cid" : // 18位身份证号
                return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/.test(string);
            case "zipcode" : // 国内邮编
                return /^[1-9]\d{5}(?!\d)$/.test(string);
            case "url" : // 网址
                return /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/.test(string);
            case "IP" : // ip地址
                return /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4] \d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4] \d|25[0-5])$/.test(string);
            case "macAddress" : // 主机mac地址
                return /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/.test(string);
            case "name" : // 姓名验证
                return /^[\x80-\xff]{4,16}$/.test(string);
            case "nickname" : // 昵称验证
                return /^.{2,20}$/.test(string);
            default:
                return false;
        }
    },
    extend:function(){
        /*copy from jquery*/
        var options, name, src, copy, copyIsArray, clone,
    		target = arguments[ 0 ] || {},
    		i = 1,
    		length = arguments.length,
    		deep = false;
    	if ( typeof target === "boolean" ) {
    		deep = target;
    		target = arguments[ i ] || {};
    		i++;
    	}
    	if ( typeof target !== "object" && typeof target !== "function" ) {
    		target = {};
    	}
    	if ( i === length ) {
    		target = this;
    		i--;
    	}
    	for ( ; i < length; i++ ) {
    		if ( ( options = arguments[ i ] ) != null ) {
    			for ( name in options ) {
    				src = target[ name ];
    				copy = options[ name ];
    				if ( target === copy ) {
    					continue;
    				}
    				if ( deep && copy && (copyIsArray = Array.isArray( copy )) ) {
    					if ( copyIsArray ) {
    						copyIsArray = false;
    						clone = src && Array.isArray( src ) ? src : [];

    					} else {
    						clone = src ? src : {};
    					}
    					target[ name ] = this.extend( deep, clone, copy );
    				} else if ( copy !== undefined ) {
    					target[ name ] = copy;
    				}
    			}
    		}
    	}
    	// Return the modified object
    	return target;
    },
    stringReplaceAll(string,exp, newStr){
        return string.replace(new RegExp(exp, "gm"), newStr);
    },
    stringFormat(string,args){
        var result = string;
        if (arguments.length < 1) {
            return result;
        }

        var data = arguments; // 如果模板参数是数组
        if (arguments.length == 1 && typeof (args) == "object") {
            // 如果模板参数是对象
            data = args;
        }
        for ( var key in data) {
            if(!data.hasOwnProperty(key))break;
            var value = data[key];
            if (undefined != value) {
                result = result.replaceAll("\\{" + key + "\\}", value);
            }
        }
        return result;
    }
};
/*ES6 导出*/
export default util;
