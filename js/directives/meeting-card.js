angular.module('SimpleNotes')
	.directive('meetingCard', function(){
		return{
			restrict: 'E',
			templateUrl: 'templates/directives/meeting-card.html',
			controller: function($scope){
				
			}
		};
	});