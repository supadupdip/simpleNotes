angular.module('SimpleNotes')
		.directive('meetingAttendee',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.bind("mouseenter", function (event){
					$element.find('.removeAttendee').removeClass('hide');
				});
				$element.bind("mouseleave", function (event){
					$element.find('.removeAttendee').addClass('hide');
				});
			},
			controller: function($scope){
				if(!$scope.lastRemoved){
					$scope.lastRemoved = [];
				}

				$scope.removeAttendee = function(attendee){
					var index = $scope.note.attendees.indexOf(attendee);
					$scope.lastRemoved.push(attendee);
					//Materialize.toast("<span>"+attendee.name+" removed </span><a href='#!' no-link ng-click='undoAttendee(attendee)' class='yellow-text'>Undo</a>", 60000);
					Materialize.toast(attendee.name+" removed", 6000);
					$scope.note.attendees.splice(index, 1);

				};

				$scope.removeParticipant = function(participant){
					var index = $scope.meeting.participants.indexOf(participant);
					$scope.lastRemoved.push(participant);
					//Materialize.toast("<span>"+participant.name+" removed </span><button ng-click='undoAttendee(participant)' class='btn-flat yellow-text'>Undo<button>", 6000);

					$scope.meeting.participants.splice(index, 1);
					$scope.Update($scope.meeting);
					Materialize.toast(attendee.name+" removed", 6000);
				};

				$scope.editAttendee = function(attendee){

				}
				$scope.undoAttendee = function(attendee){

				}
				$scope.undoParticipant = function(participant){

				}
			}
		}
	});
