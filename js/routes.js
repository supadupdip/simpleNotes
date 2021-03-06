angular.module('SimpleNotes')
	.config(function($routeProvider){
		$routeProvider
		.when('/about',{
			templateUrl: 'templates/pages/about.html',
			controller: 'AboutController'
		})
		.when('/meeting/:meetingID',{
			templateUrl: 'templates/pages/meeting-overview.html',
			controller: 'MeetingOverviewController'
		})
		.when('/meeting/:meetingID/message/:messageID',{
			templateUrl: 'templates/pages/meeting-overview.html',
			controller: 'MeetingOverviewController'
		})
		.when('/editNote/:noteID',{ // /meeting/:meetingID/editNote/:noteID/
			templateUrl: 'templates/pages/edit-meeting-notes.html',
			controller: 'editNoteController'
		})
		.when('/editNote/:noteID/message/:messageID',{ // /meeting/:meetingID/editNote/:noteID/
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
		.when('/newNote',{
			templateUrl: 'templates/pages/new-note.html',
			controller: 'NewNoteController'
		})
		.when('/newNote/meeting/:meetingID',{
			templateUrl: 'templates/pages/new-note.html',
			controller: 'NewNoteController'
		})
		.when('/',{
			templateUrl: 'templates/pages/meetings-index.html',
			controller: 'MeetingsIndexController'
			//controllerAs: 'meetingsIndexCtrl'

		})
		.otherwise({redirectTo: '/'});
	});
