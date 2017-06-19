/*
	commonjs 主要放项目中的共用方法，如果获取用户信息、登录等等
*/
var commonjs = {
	login(context){
        /*微信授权登录*/
        var self = this;
        var loginNum = cache.getSession("wxLogin")||0;
		/*限制拉起授权次数*/
        if(loginNum >= 10)return false;

        loginNum++;
        cache.setSession("wxLogin",loginNum);
        /*确定要重新登录的话，清楚之前存储于本地的信息*/
        cache.removeStorage("third_session");
        var urlParam = ''
        if(typeof context.$route.query.shared_id != 'undefined'){
            urlParam = '&shared_id='+context.$route.query.shared_id;
        }
        var url = util.preUrl+"r=share/get-user-info"+urlParam;
        window.location.href = url;
    },
}
export default commonjs;
