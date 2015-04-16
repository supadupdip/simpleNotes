angular.module('SimpleNotes')
	.directive('hastooltip',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				var pos = $attrs.position;
				var delay = $attrs.delay;
				var text = $attrs.tooltip;
				console.log(text);
				$element.tooltip({
					position: pos,
					delay: delay,
					tooltip: text
				});
				//console.log($element);
			}
		}
	});