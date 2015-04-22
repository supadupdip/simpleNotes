angular.module('SimpleNotes')
	.directive('preloader', function(){
		return{
			restrict: 'A',
			replace: true,
			templateUrl: 'templates/directives/preloader.html',
			link: function($scope, $element, $attrs){

			}
		}
	});