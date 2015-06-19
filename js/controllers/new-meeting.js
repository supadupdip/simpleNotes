angular.module('SimpleNotes')
	.controller('NewMeetingController',['$http', '$scope','meetingFactory', 'connectionFactory', function($http, $scope, meetingFactory, connectionFactory){
		var controller = this;

		$scope.meeting = new meetingFactory.getMeeting();


		console.log($scope.meeting);


		$scope.back = function(){

			if(window.history.length){
				window.history.back();
			}
			else{
				window.location.href = '#/';
			}
		};

		$scope.save = function(meeting){

			var response = connectionFactory.newMeeting(meeting);
			var newID = response.key();
			if(newID){
				//alert('New meeting was created with ID'+newID);
				window.location.href = '#/meeting/'+newID+'/message/created';
			}
			else{
				alert('There was an error creating the meeting')
			}

			/*
			$http({method: 'POST', url:'/json'})
				.catch(function(meeting){
					$scope.errors = meeting.data.error;
					console.log($scope.errors.text);
				})
				.success(function(response){
					console.log(response.text);
					//Show success message

					//Redirect to Meeting overview
				});*/
		};


	}]);
