angular.module('SimpleNotes')
	.controller('MeetingOverviewController',['$http', '$scope','$routeParams','meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){    
		var  meetingID = $routeParams.meetingID;
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;
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

		$scope.logIt = function(meeting){
			console.log(meeting);
		};

		$scope.save = function(meeting){
			
			var response = connectionFactory.newMeeting(meeting);
			var newID = response.key();
			if(newID){
				alert('New meeting was created with ID'+newID);
				//window.location('/editMeeting/meetingID'+meetingID);
			}
			else{
				alert('There was an error creating the ')
			}
			console.log(newID);
			
			
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


	}])
	.directive('materialtabs', function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.tabs();
			}
		}
	});