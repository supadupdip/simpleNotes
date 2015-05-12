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