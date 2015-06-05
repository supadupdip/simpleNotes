angular.module('SimpleNotes')
	.controller('editNoteController',['$http', '$scope', '$routeParams', 'meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){

		var  noteID = $routeParams.noteID;
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;
		var meetingResponse = null;
		var response = connectionFactory.getNote(noteID);

			response.success = false;
		     response.$loaded().then(function() {
		        //console.log("loaded note record:", response);
		        response.success = true;
		        $scope.page.loading = false;
		        if(response.meeting){
							$scope.note = response;
							$scope.loadMeetingInfo($scope.note.meetingID);
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
		//console.log($scope.note);
		//$scope.loadMeetingInfo($scope.note.meetingID);
		$scope.addNoteCard = function(){
			var blankCard = new meetingFactory.getNoteCard();
			//Check that the noteCards property exsits
			//This is necessary for FireBase which wont let you save a blank array
			if(!$scope.note.noteCards){
				$scope.note.noteCards= [];
			}
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
				window.location.href = "#/";
			}
		};

		$scope.Update = function(note){
			$scope.page.updating = true;
			//var response = connectionFactory.updateMeeting(meetingID);
			      note.$save().then(function() {
			        $scope.page.updating = false;
			        //pop up a message that it saved succesfully!
			        Materialize.toast('Note updated!', 4000) // 4000 is the duration of the toast
			        //$scope.addNewParticipantsToMeeting($scope.meeting.participants, note.attendees);
							//Also update the latest activity for this meeting
							$scope.UpdateMeeting($scope.meeting);

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
			  //console.log("Error:", error);
			});
			//We also delete any meeting notes associated with this meeting
		};

		$scope.undoAttendee = function(){
			console.log('attempting undo');
		};

		$scope.loadMeetingInfo = function(meetingID){
			meetingResponse = connectionFactory.getMeeting(meetingID);

				meetingResponse.success = false;
			     meetingResponse.$loaded().then(function() {
			        console.log("loaded record:", meetingResponse);
			        meetingResponse.success = true;
			        $scope.page.loading = false;
			        if(meetingResponse.Title){
								$scope.meeting = meetingResponse;
			        }
			        else{
			        	//the item was not found
			        	$scope.page.error = true;
			        	$scope.page.errorMessage = "The item you're looking for doesn't seem to exist";
			        }



			     }).catch(function(error){
			     	$scope.page.error = true;
			     	$scope.page.errorMessage = error;
			     	alert('There was an error fetching the meeting data');
			     });
		};
		$scope.addNewParticipantsToMeeting = function(participants, meetingAttendees){
			console.log('Logging the attendees for the meeting', meetingAttendees);
			var newParticipants = [];
			for(var i = 0; i< meetingAttendees.length; i++){
				//Let's check if this attendee already exists in the meeting participants list
				if(participants.indexOf(meetingAttendees[i]) == -1) {
				   newParticipants.push(meetingAttendees[i]);
				}
			}
			console.log('these are the attendees we are going to add', newParticipants);
		};
		$scope.UpdateMeeting = function(meeting){
			var currentDate = new Date();
			var jsonDate = currentDate.toJSON();
			$scope.meeting.lastActivity = jsonDate;
			meeting.$save().then(function() {
				//pop up a message that it saved succesfully!
				Materialize.toast('Meeting updated!', 4000) // 4000 is the duration of the toast
			}).catch(function(error) {
				alert('Error Updating Meeting!');
			});
		};
	}]);
