$(function(){
	//bootstrap的dropdown-menu(下拉菜单)点击选项后不关闭的方法
	$('.dropdown-menu>.list-group').click(function(e) {
	   	 e.stopPropagation();
	});
	//屏幕为移动端是移除电脑的左边选项栏
	$('.left-box>a').click(function(){
		$('.center>.params').remove();
	})
	//屏幕为pc端是移除移动端的上边选项栏
	$('.left').click(function(){
		$('.left-box').remove();
	})
})