$(function(){
	$(".cartTop").load("index.html #header");
	$(".cartHooter").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");
	
	//获取cookie信息
	//var carts = $.cookie("myCart");
	//console.log($.cookie("myCart"));
	var myCartsCookie =JSON.parse($.cookie("myCart"));
	console.log(myCartsCookie);
	$.each(myCartsCookie, function(){
		
		/*<li><img src="../img/goodDetail/prif5.jpg"/></li>
							<li><a href="#">遇见❤缘，材质：D，镶口：55-60分 DRW124505D</a></li>
							<li>4</li>
							<li></li>
							<li>3470.00</li>
							<li>1456.00</li>
							<li>1618.00</li>
							<li>
								<a class="delete">删除</a>
								<a class="revise">修改</a>
							</li>*/
		var goodsTitle = decodeURIComponent(this.title);
		var liImg = "<li><img src="+this.data.img+" alt='' /></li>";
		var liName = "<li><a> "+goodsTitle+" , 材质: "+'18k'+"</a></li>";
		var liSize = "<li>"+this.data.size+"</li>";
		var liLetter = "<li>"+this.data.letter+"</li>";
		var liMarketPrice = "<li class='marPrice'>"+this.data.marketPrice+"</li>";
		var liSale = "<li class='sale'>"+this.data.sale+".00</li>";
		var liMallPrice = "<li class='malPrice'>"+this.data.mallPrice+"</li>";
		var liChange = "<li><a class='delete'>删除</a><a class='revise'>修改</a></li>";
		$("<ul></ul>").html(liImg+liName+liSize+liLetter+liMarketPrice+liSale+liMallPrice+liChange).appendTo("#cartGoods");
	});
	
	//商品数量
	var cartGoods = document.getElementById("cartGoods");
	var ulLength = cartGoods.getElementsByTagName("ul");
	$(".counts").html(ulLength.length);
	//商品金额
	var sum = 0;
	$.each($(".marPrice"),function(){
		 sum = parseInt($(this).text())+sum;
		 return sum;
	})
	$(".primePrice").html(sum+".00 ");
	//优惠金额
	var saleSum = 0;
	$.each($(".sale"),function(){
		 saleSum = parseInt($(this).text())+saleSum;
		 return saleSum;
	})
	$(".discount").html(saleSum+".00 ");
	//订单总金额
	//优惠金额
	var mallSum = 0;
	$.each($(".malPrice"),function(){
		 mallSum = parseInt($(this).text())+mallSum;
		 return mallSum;
	})
	$(".specialPrice").html(mallSum+".00 ");
	//删除商品
	$(".delete").click(function(){
		$(this).parents("ul").remove();
		//$.cookie("myCarts", $(this).parents("ul").find("li:first").text(),{expires: -1 });
	});
	//完成了
	//ajsdnks
});