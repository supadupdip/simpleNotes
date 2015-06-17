angular.module('SimpleNotes')
	.controller('NewNoteController',['$http', '$scope','meetingFactory', 'connectionFactory', function($http, $scope, meetingFactory, connectionFactory){
			var controller = this;

			$scope.page = {};
			$scope.page.loading = true;
			$scope.page.updating = false;
			$scope.page.error = false;
			$scope.newNote = new meetingFactory.getNote();
			console.log('logging newNote at the beginning of the page',$scope.newNote);
			var response = connectionFactory.getAllMeetings();

				response.$loaded().then(function() {
						console.log("loaded available meetings:", response);
						$scope.page.loading = false;
						if(response.length){
							$scope.meetings = response;
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

		//Functions Available to our View
		$scope.createNote = function(noteInfo){
			//find the TItle of the Meeting
			for(var i = 0; i < $scope.meetings.length; i++){
				console.log('evaluating ', $scope.meetings[i]);
				if($scope.meetings[i].$id == noteInfo.meetingID){
					noteInfo.meetingTitle = $scope.meetings[i].Title;
				}
			}

			var response = connectionFactory.newNote(noteInfo);
			var newID = response.key();
			if(newID){
				//alert('New meeting was created with ID'+newID);
				window.location.href = '#/editNote/'+newID;
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

	}
	}]);
