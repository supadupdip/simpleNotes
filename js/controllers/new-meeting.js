angular.module('SimpleNotes')
	.controller('NewMeetingController', function($http){
		var controller = this;

		this.saveMeeting = function(meeting){
			controller.errors = null;
			$http({method: 'POST', url:'/json'})
				.catch(function(meeting){
					controller.errors = meeting.data.error;
				})
				.success(function(response){
					console.log(response.text);
					//Show success message

					//Redirect to Meeting overview
				});
		}


	});