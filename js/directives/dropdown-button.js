angular.module('SimpleNotes')
	.directive('dropdownButton', function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.dropdown();
			}
		}
	});