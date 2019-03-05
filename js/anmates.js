	//结果集
		var result = [];
		//初始速度
		var _speed = 500;
		$(function(){
			//左边按钮点击出现在中间位置
			$('.list-group>button').on('click',function(){
				//清空结果集
				result = [];
				//获取data-name的值
				var name = $(this).data('name');
//				alert(name);
				var title = $(this).text();
//				alert(title);
				//隐藏提示框
				$('.params>.tips').hide();
				//显示速度框
				$('.params>.speed').show();
				//判断是否已经添加属性
				var flag = true;
				$('.params>.item').each(function(index,element){
					var names = $(element).find('input').data('class');
						if(names==name){
							alert('此属性已添加');
							flag=false;
							return;
						}
				})
				// 添加配置
				if(flag){
					$('.params').append('<div class="item">'+
						'<span>'+title+'：</span><input type="input" value="" data-class='+name+' data-title='+title+' >'+
						'</div>');
				}
				})
				
			
			//执行动画
			$('.button').on('click',function(){
				$('.log>.detail').html('');
				$('.params>.item').each(function(index,element){
//					console.log($(element).val());
							var values = $(element).find('input').val();
							var name = $(element).find('input').data('class');
							var title = $(element).find('input').data('title');
							result.push({
								values:values,
								name:name,
								title:title
							});
//							alert(typeof($('#j-speed').val()));
							_speed = $('#j-speed').val()||500;
//							alert(_speed);
//							console.log(result);
				})
				if(result.length==0){
					alert('执行失败，请添加动画效果后执行！');
					return;
				}
				for(var key in result){
					if(!result[key].values){
						alert('执行失败，请填写完整的参数！');
						result = [];
						return;
					}
				}
				
				
				if($(this).data('type')=="order"){
					$('.log>.detail').append("执行顺序动画");
//					alert('order');
					orderDo();
				}else{
					$('.log>.detail').append("执行队列动画");
//					alert('queue');
					queueDo();
				}
				//清空结果集
				result = [];
			})
			
			//顺序执行动画
			function orderDo(){
				var param = {};
				for(var key in result){
					if(result[key].name=='opacity'){
						param[result[key].name] = result[key].values;
					}else{
						param[result[key].name] = result[key].values+'px';
					}
					$('.log>.detail').append('<div class="step">执行：设置'+result[key].name+':'+param[result[key].name]+'</div>');
				}
//				console.log(param);
				$('.target').animate(param,_speed);
				$('.log>.detail').append('<div class="step">代码animate('+JSON.stringify(param)+','+_speed+')</div>');
			}
			//队列执行动画
			function queueDo(){
				var param = {};
				for(var key in result){
					if(result[key].name=='opacity'){
						param[result[key].name] = result[key].values;
					}else{
						param[result[key].name] = result[key].values+'px';
					}
					$('.log>.detail').append('<div class="step">执行：设置'+result[key].name+':'+param[result[key].name]+'代码:animate({'+result[key].name+':'+param[result[key].name]+'},'+_speed+')</div>');
//					$('.log>.detail').append('<div class="step">代码:animate('+JSON.stringify(param)+','+_speed+')</div>');
					$('.target').animate(param,_speed);
				}
			}
			
			$('.reset').click(function(){
				$('.params>.item').remove();
				$('.params>.speed').hide();
				$('.params>.tips').show();
				$('.log>.detail').html('');
			})
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