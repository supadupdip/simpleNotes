angular.module('SimpleNotes')
	.controller('MeetingOverviewController',['$http', '$scope','$routeParams','meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){
		var  meetingID = $routeParams.meetingID;
		var messageID = null;
		if($routeParams.messageID){
			//console.log('We detected a message ID');
			messageID = $routeParams.messageID;
			if(messageID == "created"){
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
		        //console.log("loaded record:", response);
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
		        //console.log("loaded note records:", noteResponse);
		        $scope.page.loading = false;
		        if(noteResponse.length){
					$scope.notes = noteResponse;
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
