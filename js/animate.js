/*
	基本动画
*/

// 结果集
var result = [];

// 动画速度
var _speed = 500

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
		// 时间设置
		$('.panel .params .speed').show();
		// 添加配置
		$('.params').append('<div class="item">'+
				'<span>'+title+'：</span><input type="input" value="" data-class='+name+' data-title='+title+' >'+
				'</div>')
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
		_speed = $('#j-speed').val() || 500
	}

	// 动画队列
	function queueDO(){
		// 遍历结果
		for (var key in result) {
			var param = []
			if(result[key].name != 'opacity') {
				param[result[key].name] = result[key].value + 'px'
			}else {
				param[result[key].name] = result[key].value
			}
			// 执行动画
			var duration = {
				duration:_speed
			}
			$('.target').animate(param,Number(_speed))
			// 记录代码
			log('order',result[key].title,result[key].value,result[key].name)
    	}
	}

	// 执行动画
	function orderDo(){
		// 遍历结果
		var param = {}
		for (var key in result) {
			if(result[key].name != 'opacity') {
				param[result[key].name] = result[key].value + 'px'
			}else {
				param[result[key].name] = result[key].value
			}
			log('queue',result[key].title,result[key].value,result[key].name)
		}
		// 执行动画
		$('.target').animate(param,Number(_speed))
		// 记录代码
		log('queue','','','',param)
	}

	// 执行动画
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
		
		// 获取类型
		var type = $(this).data('type');
		// 顺序执行
		if(type == 'order'){
			$('.log .detail').append('按顺序执行动画')
			orderDo()
		}else{
			$('.log .detail').append('按队列执行动画')
			//队列执行
			queueDO()
		}
		// 重置结果集，防止叠加效果
		result = []
	})

	// 日志记录
	function log(type,title,value,name,params){
		//插入日志
		if(params){
			$('.log .detail').append('<div class="step">代码：animate('+JSON.stringify(params)+','+_speed+')</div>')
			return
		}
		if(type == 'order'){
			if(name == 'opacity'){
				$('.log .detail').append('<div class="step">执行：设置'+title+'<span>'+value+'</span>'+
					'；代码：animate({'+name+','+value+'},'+_speed+')</div>'
				)
			}else{
				$('.log .detail').append('<div class="step">执行：设置'+title+'<span>'+value+'</span>'+
					'；代码：animate({'+name+',"'+value+'px",'+_speed+')</div>'
				)
			}
		}else{
			if(name == 'opacity'){
				$('.log .detail').append('<div class="step">执行：设置'+title+'<span>'+value+'</span></div>'
				)
			}else{
				$('.log .detail').append('<div class="step">执行：设置'+title+'<span>'+value+'</span></div>'
				)
			}
		}
	}

	// 还原操作
	$('.reset').on('click',function(){
		reset()
	})

	// 还原函数
	function reset(){
		$('.params').find('.item').remove()
		$('.params').find('.tips').show()
		$('.params').find('.speed').hide()
		$('.target').removeAttr('style')
		$('.log .detail').html('')
	}

});
