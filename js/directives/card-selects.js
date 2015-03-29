angular.module('SimpleNotes')
	.directive('cardSelects', function(){
		return{
			restrict: 'E',
			templateUrl: '/templates/directives/card-selects.html',
			controller: function($scope){

			}
		};
	});