angular.module('SimpleNotes')
	.directive('collapsible',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$scope.$watch('notes', function(){
					$element.collapsible({});
				});	
			}
		}
	});