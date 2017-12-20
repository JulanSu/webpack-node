require('../../components/app/app-open.js');
require('../../common/js/hammerObj');
require('../../components/mgui/loading/');
var Swipe = require('../../components/mgui/swipe/default');

//判断页面的高度
$(function(){
	var winHeightDev = $(window).height()-$('.con-text').height()-$('.top').height()-$('#appOpen').height() - 80;
	$('.swipe-item a').css('height',winHeightDev);
	$('#btnClose').on('click',function(){
	var HeightDev = $(window).height()-$('.con-text').height()-$('.top').height() - 50;
	$('.swipe-item a').css('height',HeightDev);
	})
})

hammerObj(".device-screen","#img");
if($('.swipe-item').length > 1){
	$(".swipe-win").get(0).addEventListener('touchend', touchEve, false);
	function touchEve(index,len){
		$(".top").find("p").html((index+1)+" / "+len);
	}
	var slideIndex,slideLen;
	var swipe = document.getElementById('swipeWrap');
	var slide = new Swipe(swipe,{
		pagination: true,
		change:function(index,len){
			slideIndex = index;
			slideLen = len;
			touchEve(index,len);
		}
	});
}else{
	$(".top").find("p").html('1/1');
}

//判断是否为QQ或UC
var ua = navigator.userAgent.toLowerCase();
if(ua.indexOf('ucbrowser') > 0){
	var tDev = $(window).height()-$('.con-text').height()-$('.top').height()-$('#appOpen').height()- 80;
	$('.swipe-item a').css('height',tDev);
}else if(ua.indexOf('qqbrowser') > 0){
	var tDev = $(window).height()-$('.con-text').height()-$('.top').height()- 65;
	$('.swipe-item a').css('height',tDev);
}
$('.top .left').on('click',function(){
	window.history.back(-1);
});

//双击放大图片
$("#swipeWrap").find("li").click(function(){
	var index=slide.getPos()+1;
	var source=$(this).find("img").attr("src");
	$(".dialog").show().find("img").attr("src",source);
});

$('.con-text a').on('click',function(){
	if(storeSetting == 0 && expoSetting == 0){
		$toast.show('该店铺暂不支持预约',2000);
		return false;
	}
})

