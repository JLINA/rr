//头部+尾部
$(function(){
	$("#headTop").load("index.html #header");
	$(".footer").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");
	
	
	
	
	//手机校验
	$("#userName").focus(function(){
		//清空
		$(this).attr("placeholder","");
	}).blur(function(){
		//失去焦点恢复
		$(this).attr("placeholder","11位数字");
		//$userName = $(this).val();
	});
	//密码校验
	$("#psw").focus(function(){
		//清空
		$(this).attr("placeholder","");
	}).blur(function(){
		//失去焦点恢复
		$(this).attr("placeholder","6-20位必须包含字母数字");
	});
	$(".loginBtn").click(function(){
		console.log("dianj");
		var $userName = $("#userName").val();
		var $psw = $("#psw").val();
		//判断用户名和密码是否为空
		if($userName != "" && $psw != ""){
			var uCookie = $.cookie("user");
			//如果字符串为空，则跳转注册页面
			if(uCookie == "" || uCookie == undefined){
				var obj = {type:false};
				location.href = "register.html";
			}else{//未注册
				var arrCookie = JSON.parse(uCookie);
				var inReg = true;
				$.each(arrCookie,function(){
					if( this.userName ==$userName && this.pswd == $psw){
						//登录成功
						inReg = false;
						location.href = "index.html";
						console.log("成功了");
					}
				});
				if(inReg){//未注册
					var obj ={type:false};
				}else{
					
					var obj = {type:true,name:$userName};
				}
			}
			$.cookie("login",JSON.stringify(obj),{expires:7 , path:"/"});
		}else{
			console.log("错误");
		}
	});
	
	
});
