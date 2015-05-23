angular.module('SimpleNotes')
	.controller('EditMeetingController',['$http', '$scope', '$routeParams', 'meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){

		var  meetingID = $routeParams.meetingID;
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;


		//$scope.meeting = meetingFactory.getMeeting();
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
					Materialize.toast('Meeting Updated', 4000);
					//window.location = "/meeting/"+meetingID;
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
			  $('#itemDeleted').openModal({
				  dismissible: false,
				  complete: function(){
					  //When the user dismissed the modal we navigate to the main page
					  window.location = "/";
				  }
			  });
			}, function(error) {
			  alert('Something went wrong! Try again');
			});
			//We also delete any meeting notes associated with this meeting
		};

	}])	;