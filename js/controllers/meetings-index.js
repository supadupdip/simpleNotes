angular.module('SimpleNotes')
	.controller('MeetingsIndexController', function($http){
		var controller = this;

		$http({method: 'GET', url:'/json/meetings.js'})
			.success(function(data){
				controller.meetings = data;
			})
			.catch(function(err){
				console.log(err);
			})
			;

	});