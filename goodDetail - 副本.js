$(function(){
	$(".headerTop").load("index.html #header");
	$(".footerBot").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");
	
	//页面商品内容
	var title = location.search.replace("?","");
	var goodsName = decodeURIComponent(title);
	$(".diamName").html(goodsName);
	//获取cookie信息
	//var goods = $.cookie("goods")
	var oCookie =JSON.parse($.cookie("goods")) ;
	$.each(oCookie, function() {
		if(this.title == goodsName){
			$(".marketPrice").html(this.data.marketPrice);
			$(".mallPrice").html(this.data.mallPrice);
			$(".bImg").html("<img src="+this.data.img+"/>");
			$(".bigerPic").html("<img src="+this.data.img+"/>");
			
			/*json加载产品信息图片*/
			$.ajax({
				type:"get",
				dataType:"json",
				url:"../data/goodDetail.json",
				success:function(res){
					/*$.each(res[goodsName].smallPic, function() {
						$("<li></li>").html("<img src="+this[index]+" alt='' />").appendTo(".smallone>ul");
					});*/
					for(var index= 0;index<res[goodsName].smallPic.length;index++){		
						$("<li></li>").html("<img src="+res[goodsName].smallPic[index]+" alt='' />").appendTo(".smallone>ul");
					}
					for(var index= 0;index<res[goodsName].detailPic.length;index++){
						$("<div></div>").html("<img src="+res[goodsName].detailPic[index]+" alt=''/>").appendTo(".prodInfo");	
					}
				}
			});
		}else{
			return ;
		}
	});	
	
	//放大镜
	$(document).on("click",".smallone ul li",function(){
		console.log("dianj");
		$(".bImg").html($(this).html());
		$(".bigerPic").html($(this).html());
	})
	
	var $smallpic = $(".bImg");			
	var $pos = $(".fangdajing");
	var  $bigpic = $(".bigerPic img");
	//$(document).on("mouseover",document,function(e){
	$(document).mousemove(function(e){
		//e.pageX  e.pageY ; //鼠标位置
		//$('#smallpic').offset(); 小框的位置
		var smallOffset = $smallpic.offset();
			if(e.pageY >= smallOffset.top &&e.pageX>=smallOffset.left && e.pageX<= smallOffset.left + $smallpic.outerWidth() && e.pageY <= smallOffset.top + $smallpic.outerHeight()){
				$($pos).show();
				$(".bigerPic").show();
				//算出 遮罩的位置
				//1 一般情况下是 鼠标的左上角
				//设置小框的位置
				$pos.css({
					top:e.pageY -$pos.outerHeight()/2,
					left:e.pageX - $pos.outerWidth()/2,
				});
				//防止小灰块移除右边
				if(e.pageX>=smallOffset.left + $smallpic.outerWidth()-$pos.outerWidth()/2){
					
					$pos.css({
						left:smallOffset.left + $smallpic.outerWidth()-$pos.outerWidth()
					});
				}
				//防止小灰块移除下边
				if(e.pageY>=smallOffset.top + $smallpic.outerHeight()-$pos.outerHeight()/2){
					
					$pos.css({
						top:smallOffset.top + $smallpic.outerHeight()-$pos.outerHeight()
					});
				};
				//防止移除上边框
				if(e.pageY<=smallOffset.top +$pos.outerHeight()/2){
					$pos.css({
						top:smallOffset.top
					});
				};
				//防止出左边;
				if(e.pageX<=smallOffset.left +$pos.outerWidth()/2){
					$pos.css({
						left:smallOffset.left
					});
				};
				//last
				//改变大框的偏移量
				$bigpic.css({
					top: -$pos.offset().top *2 + 505,
					left: -$pos.offset().left * 2+70
				});				
			}else{
				//移开小框的范围
				$($pos).hide();
				$(".bigerPic").hide();
			}
	});
	/**材质选择**/
	$(".cMaterial span").click(function(){
		$(this).addClass("cl").siblings().removeClass("cl");
	});
	
	
	/****加入购物车(珠宝箱)****/
	$(".cart").click(function(){		
		//把点击加入购物车的产品信息存在cookie里面
		
		 //商品名称
		var goodsTitle = $(this).parents(".mainInfo").find(".diamName").text();
		 
		 //获取点击商品列表商品的cookie信息
		var goods = $.cookie("goods")
		var gCookie = JSON.parse(goods);
		//市场价格
		var marketPrice = "";
		//商城价格
		var mallPrice = "";
		$.each(gCookie, function() {
			if(this.title == goodsTitle){
				marketPrice = this.data.marketPrice.slice(1);
				mallPrice = this.data.mallPrice.slice(1);
			}
		});
		 //市场价格
		/*var marketPrice =$(this).parents(".mainInfo").find(".marketPrice>span").text();
		 
		 //商城价格
		var mallPrice = $(this).parents(".mainInfo").find(".mallPrice>span").text();*/
		 
		 //优惠价格
		var sale = parseInt(marketPrice-mallPrice);
		 
		 //img
		 var img = $(this).parents(".mainDetails").find(".bImg>img").attr('src');
		
		//材质
		 var caizhi = $(".cMaterial span").click(function(){
		 	console.log($(this).val());
		 	return $(this).val();
		 });
		 
		 //尺寸
		 var size = "--";
		 //重量
		 var weight = $(".weight>select").val();
		 //刻字内容
		 var letter = "敬请期待";
		 
		 //新的产品信息
		 var cartObj = {"title":goodsTitle,"marketPrice":marketPrice,"mallPrice":mallPrice,"img":img,
		 			"caizhi":caizhi,"sale":sale,"weight":weight,"letter":letter,"size":size};
		console.log(cartObj);
		//cartCookie 是存在cookie里面的产品信息
		 var cartCookie = $.cookie("myCart"); 	
		 console.log(cartCookie);
		//对返回的cookie 进行判断 如果为空 
		var  bGood = false;  //代表没有信息
		if(cartCookie == undefined || cartCookie =="" ){
		   //如果没有产品信息
			var jrCookie = [];
			var newGood = {"title":title,"data":cartObj}//新的完整的产品信息
			jrCookie.push(newGood);
		}else{
			//转换成对象
			var jrCookie = JSON.parse(cartCookie);
			//有信息，但当前没有点击
			if(bGood==false){
				//生成新的商品信息
				var newGood = {"title":title,"data":cartObj}
				//压入新的完整的产品信息
				jrCookie.push(newGood);
			}
		}
		//重新设置cookie
		$.cookie("myCart",JSON.stringify(jrCookie),{expires:30 , path:"/"});
		//点击商品跳转购物车页面：cart
		location.href="cart.html";
	});
	
	/*//加入购物车功能   存放cookie
	
	$('#add_car').click(function(){
		if($.cookie('car')){
			var arr = JSON.parse($.cookie('car'));
			var obj = {
				img : "<img src='../img/buycar/shoes_0"+arr.length+".jpg'/>",
				name: $('._main_02_00').html(),
				size: $('.main_02_ative').html(),
				color:$('#a_color').attr('cr'),
				sp_price: $('b[p="sp_price"]').html(),
				sprice:$('b[p="price"]').html()
			}
			arr.push(obj);
			var Jsonobj = JSON.stringify(arr);
			$.cookie('car',Jsonobj,{path:'/',expires:100});
			if(confirm('添加成功，是否跳转到购物车')){
				window.location.href = "buycar.html";
			}
			
		}else{
			var arr = [];
			
			var obj = {
				img : "<img src='../img/buycar/shoes_0"+arr.length+".jpg'/>",
				name: $('._main_02_00').html(),
				size: $('.main_02_ative').html(),
				color:$('#a_color').attr('cr'),
				sp_price: $('b[p="sp_price"]').html(),
				sprice:$('b[p="price"]').html()
			}
			arr.push(obj);
			var Jsonobj = JSON.stringify(arr);
			$.cookie('car',Jsonobj,{path:'/',expires:100});
			if(confirm('添加成功，是否跳转到购物车')){
				window.location.href = "buycar.html";
			}
		}
			
	})*/
	
	/***吸顶菜单***/
	var rightTitleTop = $(".rightTitle").offset().top;		
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		//加上页面头部的高度
		if(scrollTop >= rightTitleTop + 180 ){
			$(".rightTitle").css({"position":"fixed","top":0});
		}
		else{
			$(".rightTitle").css({"position":"static"});
		}
		
	});
});