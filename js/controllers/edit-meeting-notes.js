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
			var blankCard = new meetingFactory.getNoteCard();
			var blankActionItem = meetingFactory.getActionItem();
			//blankCard.actionItems.push(blankActionItem);
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

	}]);





