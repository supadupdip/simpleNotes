
angular.module('SimpleNotes')
	.controller('MeetingsIndexController',['$http', '$scope', 'meetingFactory', 'connectionFactory', function($http, $scope, meetingFactory, connectionFactory){
		
		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;
		$scope.page.searchText = '';


		var response = connectionFactory.getAllMeetings();

			response.success = false;
		     response.$loaded().then(function() {
		        console.log("loaded record:", response);
		        response.success = true;		        
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
		/*
		$http({method: 'GET', url:'/json/meetings.js'})
			.success(function(data){
				controller.meetings = data;
			})
			.catch(function(err){
				console.log(err);
			})
			;*/

	}]);