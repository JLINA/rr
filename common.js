
function loadHtml(url, targetId) {
	$.ajax({
			url: url,
			dataType: "html",
			async: false,
			success: function(msg) {
				$("#"+targetId).html(msg);
		}
	})
}

$(function(){
	/**top.searchText**/
	$(document).on("focus",".searchText",function(){
		$(this).attr("placeholder","");
	}).on("blur",".searchText",function(){
		$(this).attr("placeholder","请输入型号或者名称");
	});
	/**top.searchBtn**/
	$(document).on("click",".searchBtn",function(){
		
	});
	/****menu*****/
	$(document).on("mouseenter",".typeAll",function(){
		$('#typeAll').show();
	});
	$(document).on("mouseleave",".typeAll",function(){
		$('#typeAll').hide();
	});
/*	$('.typeAll').hover(function(){
		$('#typeAll').show();
			
		},function(){
			$('#typeAll').hide();
	});*/
		
	/***对应商品列表***/
	var goodsIndex = ["","diamond","ring","pendant","earring","bracelet"];
	$(document).on("click",".bold",function(){
		
		var index = $(this).parent().index();
		var $goodsIndex = goodsIndex[index];
		console.log($goodsIndex);
		console.log(index);
		location.href="goodList.html?"+$goodsIndex;
		$.ajax({
			type:"get",
			dataType:"json",
			url:"../data/goodList"+$goodsIndex+".json",
			async:true,
			success:function(res){	
				console.log(res);
			  /*效果：<div class="goods">
					<div class="goodsImg">
						<a href="#"><img src="../img/goodList/right/small20160310040516-1.png"</a>
					</div>
					<p class="goodsName"><a href="#">爱情手镯(DBW134533D)</a></p>
					<p><span class="goodsPrice">市场价：<span>￥19841.00</span></span><span class="salePrice">商城价：<span>￥10443.00</span></span></p>
				</div>*/
				var order = ["first","second","third","fourth","fifth"];
				$.each(res[order[index]], function() {
					console.log(res[order[index]]);
					$("<div/>").addClass("goods").html("<div class='goodsImg'><a href='#'><img src="+this.img+" alt=''/></a></div><p class='goodsName'><a href='#'>"
					+this.name+"</a></p><p><span class='goodsPrice'>市场价：<span>"+this.oldPrice
					+"</span></span><span class='salePrice'>商城价：<span>"+this.newPrice
					+"</span></span></p>").appendTo(".goodsList");
					
				});
			}	
		});
	});
	/***cityList***/
	$(document).on("mouseover",".cityList li",function(){
	//$('.cityList li').mouseover(function(){
		var $index = $(this).index();
		$(this).addClass('select').siblings().removeClass('select');
		$(this).parent().parent().siblings('.cityMap').children().eq($index).show().siblings().hide();
		$(this).parent().parent().siblings('.shop').children().eq($index).show().siblings().hide();
	});
	/****二维码.evm****/
	$(document).on("mouseenter","#evm",function(){
		$("#evm").find('.sevm').show();
	});
	$(document).on("mouseleave","#evm",function(){
		$("#evm").find('.sevm').hide();
	});
	
	//返回顶部
	$(document).on("click","#toTop", function(){
	//$("#toTop").click(function(){
		//瞬间回到顶部
		$("html,body").animate({scrollTop:0}, 0);
	});
//     wsfhrejwktherj
//		测试 git的写法是打开进风口领导随时随地的德国妇女，大煞风景经济带开发符合   简单的打底裤坎坎坷坷坎坎坷坷撒
//	sdfljklergjrtlkgnv cbm,bnfkj
//	sedwkjrewkjrkewlhrekthrj
//		圣诞节福利的几个客人立体感镂空的设计经二路你个客人苦尽甘来客人价格特可怜人沟通
})
