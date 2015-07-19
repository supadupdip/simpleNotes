angular.module('SimpleNotes')
	.directive('hastooltip',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$($element).tooltip();

				////console.log($element);
			}
		}
	});
