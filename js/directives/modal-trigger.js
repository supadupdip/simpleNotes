angular.module('SimpleNotes')
	.directive('modalTrigger', function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.leanModal({
				});
			}
		}
	});