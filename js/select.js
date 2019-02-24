var result = [];

$(function(){

	// 添加动画操作
	$('.sidebar dd').on('click',function(){
		// 清空结果信
		result = []
		// 获取参数
		var name = $(this).data('name');
		var title = $(this).text();
		// 删除提示
		$('.panel .params .tips').hide();
		// 添加配置
		$(".params .item").remove();
		if(name == "all"){
			$('.params').append('<div class="item">'+
				'<span>'+title+'：</span><input type="input" value="*" readonly data-class='+name+' data-title='+title+' >'+
				'</div>')
		}
		else{
			$('.params').append('<div class="item">'+
				'<span>'+title+'：</span><input type="input" value="" data-class='+name+' data-title='+title+' >'+
				'</div>')
		}
	})
	// 获取参数
	function get(){
		// 遍历设置项
		$('.params .item').each(function(){
			var value = $(this).find('input').val()
			var name = $(this).find('input').data('class')
			var title = $(this).find('input').data('title')
			// 添加到结果集
			result.push({
				name:name,
				value:value,
				title:title
			})
		})
		//console.log(result)
	}
	// 执行函数
	function orderDo(){
		// 遍历结果
		var param = {}
		for (var key in result) {
			param[result[key].name] = result[key].value;
			// log('queue',result[key].title,result[key].value,result[key].name)
		}
		switch (result[0].name) {
			case "element":
				$(".result "+param[result[0].name]).addClass("danger");
				break;
			case "id":
				$(".result #"+param[result[0].name]).addClass("danger");
				break;
			case "class":
				$(".result ."+param[result[0].name]).addClass("danger");
				break;
			case "all":
				$(".result "+param[result[0].name]).addClass("danger");
				break;
		}
		// 执行选择器
		//$('.target').animate(param)
		// 记录代码
		log('queue','','','',param)
	}
	// 日志记录
	function log(type,title,value,name,params){
		//插入日志


		//修改此处判断选择器类型输出不同的代码
		if(params && result[0].name == "element"){
			$('.log .detail').append('<div class="step">代码：$("'+params[result[0].name]+'")</div>')
			return
		}
		else if(params && result[0].name == "id"){
			$('.log .detail').append('<div class="step">代码：$("#'+params[result[0].name]+'")</div>')
			return
		}
		else if(params && result[0].name == "class"){
			$('.log .detail').append('<div class="step">代码：$(".'+params[result[0].name]+'")</div>')
			return
		}
		else if(params && result[0].name == "all"){
			$('.log .detail').append('<div class="step">代码：$("'+params[result[0].name]+'")</div>')
			return
		}
	}
	// 执行事件
	$('.button').on('click',function(){
		// 清空日志
		$('.log .detail').html('')
		// 获取参数
		get()
		if(result.length == 0){
			$.Pop('执行失败，请添加动画效果后执行！','alert')
			return
		}
		for (var key in result) {
			if(!result[key].value){
				$.Pop('输入有误，请填写完整的参数！','alert')
				result = []
				return
			}
		}
		$(".result *").removeClass("danger");
		orderDo()
		// 重置结果集，防止叠加效果
		result = []
	})
})