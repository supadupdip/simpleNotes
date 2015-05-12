angular.module('SimpleNotes')
	.controller('NewMeetingController',['$http', '$scope','meetingFactory', 'connectionFactory', function($http, $scope, meetingFactory, connectionFactory){    
		var controller = this;

		$scope.meeting = meetingFactory.getMeeting();

		$scope.logIt = function(meeting){
			console.log(meeting);
		};

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
				window.location.href = '#/meeting/'+newID;
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
						//2015-03-15T21:03:08.241Z

						/* Old way we were trying to set view value
						$scope.$apply(function(){
							ngModelCtrl.$setViewValue(currentValue);
						});
						$element.val(currentValue);*/
					} 
				});

				


			}
		}

	});