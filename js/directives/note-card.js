angular.module('SimpleNotes')
	.directive('noteCard',function(){
		return{
			restrict: 'EA',
			templateUrl: 'templates/directives/note-card.html',
			link: function($scope, $element, $attrs){
				$element.on('mouseenter',function(){
					$element.find('.removeCard').removeClass('hide');
				});
				$element.on('mouseleave',function(){
					$element.find('.removeCard').addClass('hide');
				});				
			},
			controller: function($scope){

			}
		}
	});