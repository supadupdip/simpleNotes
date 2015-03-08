var meetings = 

angular.module('SimpleNotes')
	.controller('MeetingsIndexController', function($http, $scope){
		var controller = this;
		/*
		$http({method: 'GET', url:'/json/meetings.js'})
			.success(function(data){
				controller.meetings = data;
			})
			.catch(function(err){
				console.log(err);
			})
			;*/
		$scope.meetings = [
	{
		ID:"1",
		Title: "Box IA",
		description: "Here is some more information about this product that is only revealed once clicked on. Here is some more information about this product that is only revealed once clicked on.",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "Occurs every Tue. 1300 hrs",
		organizer: "Carlos Gonzalez",
		dialIn: "555-555-5555",
		dcsLink: "http://somelink.here/andid",
        status: "active",
		cardColor: "light-blue darken-1",
		cardIcon: "mdi-action-lock",
		cardIconColor: "black-text"
	},
	{
		ID:"2",
		Title: "EFB MCM",
		description: "Here is some more information about this product that is only revealed once clicked on. Here is some more information about this product that is only revealed once clicked on.",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "Occurs every Tue. 1300 hrs",
		organizer: "Carlos Gonzalez",
		dialIn: "555-555-5555",
		dcsLink: "http://somelink.here/andid",
        status: "",
		cardColor: "lime",
		cardIcon: "mdi-action-lock",
		cardIconColor: "white-text"
	},
		{
		ID:"3",
		Title: "Box PM",
		description: "Here is some more information about this product that is only revealed once clicked on. Here is some more information about this product that is only revealed once clicked on.",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "Occurs every Tue. 1300 hrs",
		organizer: "Carlos Gonzalez",
		dialIn: "555-555-5555",
		dcsLink: "http://somelink.here/andid",
        status: "",
		cardColor: "light-blue darken-1",
		cardIcon: "mdi-action-lock",
		cardIconColor: "black-text"
	},
		{
		ID:"4",
		Title: "Mobility Pilots",
		description: "Here is some more information about this product that is only revealed once clicked on. Here is some more information about this product that is only revealed once clicked on.",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "Occurs every Tue. 1300 hrs",
		organizer: "Carlos Gonzalez",
		dialIn: "555-555-5555",
		dcsLink: "http://somelink.here/andid",
        status: "",
		cardColor: "lime",
		cardIcon: "mdi-action-lock",
		cardIconColor: "white-text"
	},
];
	});