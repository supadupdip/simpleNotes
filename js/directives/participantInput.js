angular.module('SimpleNotes')
	.directive('participantInput',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.bind("keyup", function (event){
					if(event.which === 13){
						var newItem = {
							name: null,
							email: '',
							account: ''
						};
						newItem.name = $scope.newParticipant;


						//We're going to use the same directive for attendees and participants
						//check the attrs object to see which one we're dealing with
						participantType = $attrs.participantInput;
						if(participantType == 'attendees'){
							//Check to make sure the attendees property exists
							$scope.addAttendee(newItem);
						}
						else {
							//This means we're in the meeting overview page
							$scope.addParticipant(newItem);
						}

					}
				});

			},
			controller: function($scope, $element, $attrs){
				$scope.addPastParticipant = function(participant){
					//console.log('logging the past participant we are trying to add',participant);
					if(!$scope.note.attendees){
						$scope.note.attendees = [];
					}
					$scope.note.attendees.push(participant);
					$scope.newParticipant = null;
				};

				$scope.addAttendee = function(newItem){
					if(!$scope.note.attendees){
						$scope.note.attendees = [];
					}
					$scope.note.attendees.push(newItem);
					$scope.newParticipant = null;
					var target = event.target;
					target.focus();
					$scope.$apply();
				};
				$scope.addParticipant = function(newItem){
					if(!$scope.meeting.participants){
						$scope.meeting.participants= [];
					}
					$scope.meeting.participants.push(newItem);
					$scope.Update($scope.meeting);
					$scope.newParticipant = null;
					var target = event.target;
					target.focus();
					$scope.$apply();
				};
			}
		}
	});
