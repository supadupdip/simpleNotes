angular.module('SimpleNotes')
	.controller('MeetingOverviewController',['$http', '$scope','$routeParams','meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){
		var  meetingID = $routeParams.meetingID;
		var messageID = null;
		if($routeParams.messageID){
			////console.log('We detected a message ID');
			messageID = $routeParams.messageID;
			if(messageID == "created"){
				////console.log('message should be we created the meeting');
				Materialize.toast('Meeting Created!', 5000);
			}
			if(messageID == "updated"){
				Materialize.toast('Meeting Updated!', 5000);
			}
		}
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;

		var response = connectionFactory.getMeeting(meetingID);


		     response.$loaded().then(function() {
		        ////console.log("loaded record:", response);
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
		var noteResponse = connectionFactory.getMeetingNotes(meetingID);
		     noteResponse.$loaded().then(function() {
		        ////console.log("loaded note records:", noteResponse);
		        $scope.page.loading = false;
		        if(noteResponse.length){
							$scope.notes = noteResponse;
							$scope.checkOpenActions();
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
		$scope.checkOpenActions = function(){
			if($scope.notes){
				//console.log('we have notes');
				for(var i = 0; i < $scope.notes.length; i++){
						$scope.notes[i].actionItemsIncomplete = false;
					if($scope.notes[i].noteCards){	
						//console.log('we have notecards');
						for(var u = 0; u < $scope.notes[i].noteCards.length; u++){
							if($scope.notes[i].noteCards[u].actionItems){
								//console.log('we have action items');
								for(var y = 0; y < $scope.notes[i].noteCards[u].actionItems.length; y++){
										if(!$scope.notes[i].noteCards[u].actionItems[y].complete == true){
											$scope.notes[i].actionItemsIncomplete = true;
										}
								}
							}
						}
					}
				}
			}

		};
		$scope.Update = function(){
			$scope.page.updating = true;
			//var response = connectionFactory.updateMeeting(meetingID);

			    $scope.meeting.$save().then(function() {
					//Materialize.toast('Meeting Updated', 4000);
					//window.location = "/meeting/"+meetingID;
			      }).catch(function(error) {
			        alert('Error saving data!');
			      });
		};
	}]);
