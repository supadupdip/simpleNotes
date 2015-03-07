(function($){
  $(function(){

    $('.button-collapse').sideNav();
     $('.datepicker').pickadate();
     $('select').material_select();
     $('ul.tabs').tabs();
     //$('.save-btns').pushpin({ top: $('.save-btns').offset().top });

  }); // end of document ready
})(jQuery); // end of jQuery name space


var meetings= [
	{
		ID:"1",
		meetingTitle: "",
		description: "",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "",
		organizer: "",
		dialIn: "",
		dcsLink: "",
        status: "",
		cardColor: "",
		cardIcon: "",
		cardIconColor: ""
	},
	{
		ID:"2",
		meetingTitle: "",
		description: "",
		startDate: "",
		hour: "",
		minute: "",
		meridian: "",
		recurring: true,
		occursEvery: "",
		organizer: "",
		dialIn: "",
		dcsLink: "",
		cardColor: "",
		cardIcon: "",
		cardIconColor: ""
	}
];

var notes = {
	ID: "1",
	meetingID: "1",
	meetingDate: "",
	topicNotes: [
		{
			topicTitle: "First topic",
			topicDetails: "Some details",
			actionItems: [
				{
					complete: true,
					details: "Email someone",
					mentions: ""
				},
				{
					complete: false,
					details: "Email someonelse",
					mentions: ""
				}
			]
		},
		{
			topicTitle: "Second Topic",
			topicDetails: "Some other details",
			actionItems: [
				{
					complete: false,
					details: "Send an email",
					mentions: ""
				},
				{
					complete: false,
					details: "Send the second email",
					mentions: ""
				}
			]
		},
		{
			topicTitle: "Third Topic",
			topicDetails: "Some other details",
			actionItems: [
			]
		}
	]
};

var attendees =[
		{
			name: "Carlos Gonzalez",
			email: "",
			account: ""
		},
		{
			name: "Slutty Sussie",
			email: "",
			account: ""
		}
	];

(function(){
var app = angular.module('supnotes',[]);
  app.controller('PageController', function(){
    $scope.notes = meetingPage;
  });
  app.controller('NoteController', function(){
    this.note = notes.topicNotes;
  });
  
  app.controller('AttendeeController', function(){
    this.attendees = attendees;
  });

  app.controller('TopicController', function(){
    this.note = notes.topicNotes;
  });
  
  app.controller('ActionController', function(){
    this.note = notes.topicNotes;
  });
  
})();
