angular.module('SimpleNotes')
	.directive('fabTooltips',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$($element).mouseover(function(){
					console.log(this);
					$(this).siblings('ul').find('li').each(function(){
						//console.log('mouseovering on ', this);
						$(this).tooltip('show');
					});
				});

				$($element).mouseleave(function(){
					console.log(this);
					$(this).siblings('ul').find('li').each(function(){
						//console.log('mouseovering on ', this);
						$(this).tooltip('hide');
					});
				});

				/*
				var pos = $attrs.position;
				var delay = $attrs.delay;
				var text = $attrs.tooltip;
				console.log(text);
				$('.tooltipped').tooltip({
					position: pos,
					delay: delay,
					tooltip: text
				});*/

				//console.log($element);
			}
		}
	});
