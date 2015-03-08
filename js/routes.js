angular.module('SimpleNotes')
	.config(function($routeProvider){
		$routeProvider.when('/meeting',{
			templateUrl: '/templates/pages/meeting-overview.html'
		})
		.when('/editNotes',{
			templateUrl: '/templates/pages/edit-meeting-notes.html'
		})
		.when('/editMeeting',{
			templateUrl: '/templates/pages/edit-meeting.html'
		})
		.when('/newMeeting',{
			templateUrl: '/templates/pages/new-meeting.html',
			controller: 'NewMeetingController'
		})
		.when('/',{
			templateUrl: '/templates/pages/meetings-index.html',
			controller: 'MeetingsIndexController'
			//controllerAs: 'meetingsIndexCtrl'

		})
		.otherwise({redirectTo: '/'});
	});