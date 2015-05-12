angular.module('SimpleNotes')
	.directive('noLink',function(){
		return{
			restrict: 'A',
			priority: 1,
			link: function($scope, $element, $attrs){
				$element.bind("click", function (event){
					event.preventDefault();
				});

			}
		}
	});