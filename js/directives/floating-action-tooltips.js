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
				/* Waiting for FAB actions to be added to 
				$($element).on('click', function(){
					($($element).hasClass('menu-open')) ? console.log('this button does have an active class'): console.log('this button does not have an active class');
				});

				$($element).on('click', function(){
					this.closeFAB();
				});*/

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
