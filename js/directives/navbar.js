angular.module('SimpleNotes')
	.directive('topNav',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.sideNav();
			}
		}
	});