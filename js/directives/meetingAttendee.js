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
				$scope.lastRemoved = [];

				$scope.removeAttendee = function(attendee){
					var index = $scope.note.attendees.indexOf(attendee);
					$scope.lastRemoved.push(attendee);
					Materialize.toast("<span>"+attendee.name+" removed </span><button ng-click='undoAttendee()' class='btn-flat yellow-text'>Undo<button>", 60000);
					$scope.note.attendees.splice(index, 1);

				};

				$scope.editAttendee = function(attendee){

				}
			}
		}
	});