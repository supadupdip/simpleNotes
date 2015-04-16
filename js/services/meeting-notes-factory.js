angular.module('SimpleNotes')
	.factory('meetingFactory', function(){
		var meeting= {
			Title: null,
			meetingTitle: null,
			description: null,
			startDate: new Date(),
			hour: null,
			minute: null,
			meridian: null,
			recurring: null,
			occursEvery: null,
			organizer: null,
			dialIn: null,
			dcsLink: null,
			cardIcon: 'mdi-social-people',
			cardIconColor: 'white-text',
			cardColor: 'light-blue darken-1',
			meetingActive: true,
			participants:[]
		}

		var note={
			meetingID: null,
			meetingDate: new Date(),
			noteCards: [],	
		}
		
		var noteCard={
			topicTitle: null,
			topicDetails : null,
			actionItems : []
		}

		var actionItem = {
			complete: false,
			details: null,
			mentions: []
		}

		var participant = {

		}

		var myFactory = {};

		myFactory.getMeeting = function(){
			return meeting;
		}

		myFactory.getNote = function(){
			return meetingNote;
		}

		myFactory.getNoteCard = function(){
			return noteCard;
		}
		myFactory.getActionItem = function(){
			return  actionItem;
		}

		return myFactory;

	})
	.factory('connectionFactory', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
		var connection = {};

		connection.getAllMeetings = function(){
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetings";
			var ref = new Firebase(url);
			return $firebaseArray(ref);
			//return ref;

		}
		connection.newMeeting = function(meeting){
			console.log(meeting);
			var fireBase = new Firebase("https://sweltering-fire-6088.firebaseIO.com/meetings");
			//var datapush = fireBase.push(meeting);
			//var meetingID = datapush.key();
			//console.log(meetingID);

			return fireBase.push(meeting);
		}

		connection.getMeeting = function(meetingID){
			console.log('now getting meeting with ID', meetingID);
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetings/"+meetingID;
			var ref = new Firebase(url);
			
			return $firebaseObject(ref);
			
		}

		connection.updateMeeting = function(meetingID){
			console.log('now updating meeting with ID', meetingID);
			var wasSuccessful = false;
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetings/"+meetingID;
			var ref = new Firebase(url);
			return $firebaseObject(ref);
			

		}

		return connection;

	}]);