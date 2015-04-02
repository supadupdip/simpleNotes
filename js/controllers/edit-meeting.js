angular.module('SimpleNotes')
	.controller('EditMeetingController',['$http', '$scope', '$routeParams', 'meetingFactory', 'connectionFactory', function($http, $scope, $routeParams, meetingFactory, connectionFactory){

		//var controller = this;
		var  meetingID = $routeParams.meetingID;
		
		//$scope.meeting = meetingFactory.getMeeting();
		//$scope.meeting = connectionFactory.getMeeting(meetingID);
			console.log('now getting meeting with ID', meetingID);
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetings/"+meetingID;
			console.log('the url is ', url);
			var ref = new Firebase(url);

			//We are going to read some data now
			ref.on("value", function(snapshot) {
			  console.log('logging snapshot', snapshot.val());
			  $scope.meeting = snapshot.val();
			  $scope.$digest();
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		//console.log($scope.meeting);
		/*
		$http({method: 'GET', url: 'spsweb'})
			.catch(function(error){
				// take care of errors
			})
			.success(function(response){
				// 
				$scope.meeting = response;
			})
		*/
		$scope.logIt = function(meeting){
			console.log(meeting);
		};
		$scope.Cancel = function(){
			if(history.length){
				window.history.back();
			}
			else{
				window.location = "/";
			}
			

		};
		$scope.Update = function(meeting){
			connectionFactory.updateMeeting(meetingID, meeting);
		};


	}])
	.directive('datepicker', function(){
		return{
			restrict: 'EA',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				//Parser used when the data is traveling back to the model
			
				//Formatter used when the data is traveling from the model to the view

				//initialize control
				
				$element.pickadate({
					format: 'ddd mmm dd yyyy',
					formatSubmit: 'yyyy mm dd',
					hiddenName: false,
					hiddenPrefix: 'hidedate__',
					closeOnSelect: true,
					onRender: function(){
						var DateString = function(date){
							console.log(date);
							return date;
						}
						ngModelCtrl.$formatters.push(DateString);
					},
					onSet: function(context){
						console.log('We are setting the datepicker control', context);
						var currentValue = $element.val();
						console.log(currentValue);
						var rawDate = $("[name='startdate']").val();
						var newDate = new Date(rawDate);
						console.log(newDate);
						/*
						var ISOConversion = function(date){
							console.log('Date before ISO conversion', date);
							return date.toISOString();
						}
						ngModelCtrl.$parsers.push(ISOConversion);						
						*/
						ngModelCtrl.$setViewValue(newDate);
						$scope.$digest();
						/* Old way we were trying to set view value
						$scope.$apply(function(){
							ngModelCtrl.$setViewValue(currentValue);
						});
						$element.val(currentValue);*/
					} 
				});

				


			}
		}

	})
	.directive('hastooltip',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				console.log($element);
				$element.tooltip({delay: 50});
			}
		}
	});