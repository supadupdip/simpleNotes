
angular.module('SimpleNotes')
	.controller('MeetingsIndexController',['$http', '$scope', 'meetingFactory', 'connectionFactory', function($http, $scope, meetingFactory, connectionFactory){

		$scope.page = {};
		$scope.page.loading = true;
		$scope.page.updating = false;
		$scope.page.error = false;
		$scope.page.searchText = '';
		$scope.page.activeView = 'thumbnails';
		$scope.page.activeSort = 'activity';


		var response = connectionFactory.getAllMeetings();

			response.success = false;
		     response.$loaded().then(function() {
		        //console.log("loaded record:", response);
		        response.success = true;
		        $scope.page.loading = false;
		        if(response){
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

		$scope.getActiveSort= function(){
			return $scope.activeSort.title;
		};
		$scope.setActiveSort = function(selectedSort){
			$scope.activeSort = selectedSort;
		}	;
		$scope.setActiveView = function(viewName){
			$scope.page.activeView = viewName;
		};

		/*
		$http({method: 'GET', url:'/json/meetings.js'})
			.success(function(data){
				controller.meetings = data;
			})
			.catch(function(err){
				//console.log(err);
			})
			;*/

	}]);
