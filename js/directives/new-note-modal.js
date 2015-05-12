angular.module('SimpleNotes')
	.directive('newNote', function(){
		return{
			restrict: 'A',
			replace: true,
			priority: 1,
			templateUrl: 'templates/directives/new-note-modal.html',
			link: function($scope, $element, $attrs){
				$('#newNote').on('click', function(){
					$scope.newNote = {};
					$scope.newNote.meetingDate = new Date();
					$element.openModal({
						ready: function(){
							alert('hiiiiiii');
							$scope.getstarted();
						}
					});
				});
			},
			controller: function($scope, connectionFactory){
				$scope.getstarted = function(){
					console.log('need to load meetings');
					
					$scope.page = {};
					$scope.page.loading = true;
					$scope.page.updating = false;
					$scope.page.error = false;
					$scope.newNote = {};
					$scope.newNote.meetingDate = new Date();
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
				}
			}
		};
	});