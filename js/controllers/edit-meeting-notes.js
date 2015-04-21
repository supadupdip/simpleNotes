angular.module('SimpleNotes')
	.controller('editNoteController',['$http', '$scope', '$routeParams', 'meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){

		var  meetingID = $routeParams.meetingID;
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;

		$scope.meeting ={
			Title: 'Box IA Sync',
			participants: 	[
								{
									name: "Carlos Gonzalez",
									email: "",
									account: ""
								},
								{
									name: "Slutty Sussie",
									email: "",
									account: ""
								}
							]
		}
		$scope.note = {
							ID: "1",
							meetingID: "1",
							meetingDate: "",
							attendees: [],
							noteCards: [
								{
									topicTitle: "First topic",
									topicDetails: "Some details",
									actionItems: [
										{
											complete: true,
											details: "Email someone",
											mentions: ""
										},
										{
											complete: false,
											details: "Email someonelse",
											mentions: ""
										}
									]
								},
								{
									topicTitle: "Second Topic",
									topicDetails: "Some other details",
									actionItems: [
										{
											complete: false,
											details: "Send an email",
											mentions: ""
										},
										{
											complete: false,
											details: "Send the second email",
											mentions: ""
										}
									]
								},
								{
									topicTitle: "Third Topic",
									topicDetails: "Some other details",
									actionItems: [
									]
								}
							]
						};
		//$scope.meeting = meetingFactory.getMeeting();
		/*
		var response = connectionFactory.getMeeting(meetingID);

			response.success = false;
		     response.$loaded().then(function() {
		        console.log("loaded record:", response);
		        response.success = true;		        
		        $scope.page.loading = false;
		        if(response.Title){
					$scope.meeting = response;
		        }
		        else{
		        	//the item was not found
		        	$scope.page.error = true;
		        	$scope.page.errorMessage = "The item you're looking for doesn't seem to exist";
		        }
		        


		     }).catch(function(error){
		     	$scope.page.error = true;
		     	$scope.page.errorMessage = error;
		     	alert('There was an error fetching data');
		     });
		*/
		$scope.addNoteCard = function(){
			var blankCard = meetingFactory.getNoteCard();
			//var blankActionItem = meetingFactory.getActionItem();
			//blankCard.actionItems.push(blankActionItem);
			//var blankCard = {};
			$scope.note.noteCards.push(blankCard);
		};

		$scope.removeNoteCard = function(thisNoteCard){
			var index = $scope.note.noteCards.indexOf(thisNoteCard);
			$scope.note.noteCards.splice(index, 1); 
		};

		$scope.Cancel = function(){
			if(history.length){
				window.history.back();
			}
			else{
				window.location = "/";
			}
		};

		$scope.Update = function(meeting){
			$scope.page.updating = true;
			//var response = connectionFactory.updateMeeting(meetingID);

			      meeting.$save().then(function() {
			        alert('Profile saved to Firebase!');
			      }).catch(function(error) {
			        alert('Error!');
			      });
		};
		$scope.Delete = function(meeting){
			//Prompt for confirmation

		};
		$scope.ConfirmedDelete = function(meeting){
			//Once the user confirms we delete the meeting
			meeting.$remove().then(function(ref) {
			  // data has been deleted locally and in Firebase
			  $('#itemDeleted').openModal();
			  //window.location = "/";
			}, function(error) {
			  console.log("Error:", error);
			});
			//We also delete any meeting notes associated with this meeting
		};

		$scope.undoAttendee = function(){
			console.log('attempting undo');
		};

	}])
	.directive('actionItemInput',function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				$element.bind("keyup", function (event){
					if(event.which === 13){
						var newItem = {
							complete: false,
							mentions: ""
						};
						console.log('There was an enter key', $scope.newActionItem);
						console.log($scope);
						newItem.details = $scope.newActionItem;
						$scope.anote.actionItems.push(newItem);
						$scope.newActionItem = null;
						var target = event.target;
						target.focus();
						$scope.$apply();
					}
				});

			}
		}
	})
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
	})
	.directive('editableActionItem',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.bind("mouseenter", function (event){
					$element.find('.removeActionItem').removeClass('hide');
				});
				$element.bind("mouseleave", function (event){
					$element.find('.removeActionItem').addClass('hide');
				});
			},
			controller: function($scope){
				console.log('Logging from within editable aciton item');

				$scope.removeActionItem = function(actionItem){
					console.log('We are trying to remove an action item');
					console.log(actionItem);
					console.log($scope);
					var index = $scope.$parent.anote.actionItems.indexOf(actionItem);
					$scope.$parent.anote.actionItems.splice(index, 1);
				};

				$scope.toggleComplete = function(actionItem){
					if(actionItem.complete){
						//Set it as incomplete
						actionItem.complete = false;
					}
					else{
						//Set action item as complete
						actionItem.complete = true;
					}
				}
			}
		}
	})
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
	})
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
	})		
	;





