angular.module('SimpleNotes')
	.controller('NewMeetingController',['$http', '$scope', function($http, $scope){
		//Initialize Materialize stuff	    
		(function($){
			  $(function(){
					//$('.datepicker').pickadate();
			    

			    

			  }); // end of document ready
		})(jQuery); // end of jQuery name space

		var controller = this;

		$scope.meeting = {
			cardIcon: 'mdi-action-lock',
			cardIconColor: 'black-text',
			cardColor: 'light-blue darken-1',
			recurring: false
		};

		$scope.logIt = function(meeting){
			console.log(meeting);
		};

		this.saveMeeting = function(meeting){
			$scope.errors = null;
			$http({method: 'POST', url:'/json'})
				.catch(function(meeting){
					$scope.errors = meeting.data.error;
					console.log($scope.errors.text);
				})
				.success(function(response){
					console.log(response.text);
					//Show success message

					//Redirect to Meeting overview
				});
		};


	}])
	.directive('datepicker', function(){
		return{
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				console.log(ngModelCtrl);
				var initializedDatepicker = false;
				$attrs.$observe('datapickerFormat', function (newValue){
					//If we've already initialized this, just update the option
					if(initializedDatepicker){
						$element.pickadate('option','format', newValue);
					}
					// $observe is still called immediately, even if there's no initial value
					//so we check to configrm there's at least one format set
					else if(newValue){
						$element.pickadate({
							format: newValue,
							onStart: function(context){
								console.log(context);
								$scope.$apply(function(){
									ngModelCtrl.$setViewValue(context);
								})
								//
							}
						});
						initializedDatepicker = true;
					}
				});
			}
		}

	})
	;