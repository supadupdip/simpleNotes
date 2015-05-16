angular.module('SimpleNotes')
	.config(function($routeProvider){
		$routeProvider.when('/meeting/:meetingID',{
			templateUrl: 'templates/pages/meeting-overview.html',
			controller: 'MeetingOverviewController'
		})
		.when('/editNote/:noteID',{ // /meeting/:meetingID/editNote/:noteID/
			templateUrl: 'templates/pages/edit-meeting-notes.html',
			controller: 'editNoteController'
		})
		.when('/editMeeting/:meetingID',{
			templateUrl: 'templates/pages/edit-meeting.html',
			controller: 'EditMeetingController'
		})
		.when('/newMeeting',{
			templateUrl: 'templates/pages/new-meeting.html',
			controller: 'NewMeetingController'
		})
		.when('/',{
			templateUrl: 'templates/pages/meetings-index.html',
			controller: 'MeetingsIndexController'
			//controllerAs: 'meetingsIndexCtrl'

		})
		.otherwise({redirectTo: '/'});
	});