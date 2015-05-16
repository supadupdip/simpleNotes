angular.module('SimpleNotes')
	.directive('participantInput',function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				$element.bind("keyup", function (event){
					if(event.which === 13){
						var newItem = {
							name: null,
							email: '',
							account: ''
						};
						newItem.name = $scope.newParticipant;
						//Check to make sure the attendees property exists
						if(!$scope.note.attendees){
							$scope.note.attendees = [];
						}
						$scope.note.attendees.push(newItem);
						$scope.newParticipant = null;
						var target = event.target;
						target.focus();
						$scope.$apply();
					}
				});

			}
		}
	});