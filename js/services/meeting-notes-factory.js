angular.module('SimpleNotes')
	.factory('meetingFactory', function(){

		var participant = {

		}

		var myFactory = {};
		myFactory.getMessages = function(){
			var messages = {
				meetingCreated : "",
				noteCreated : ""
			}
			return messages;
		};
		myFactory.getMeeting = function(){
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
			};
			return meeting;
		};

		myFactory.getNote = function(){
			var note={
				meetingID: null,
				meetingDate: new Date(),
				//noteCards: [],	//Need to comment this out for FireBase
			}
			return meetingNote;
		}

		myFactory.getNoteCard = function(){
			var noteCard= {
				topicTitle: null,
				topicDetails : null,
				actionItems : []
			}
			return noteCard;
		}
		myFactory.getActionItem = function(){
			var actionItem={
				complete: false,
				details: null,
				mentions: []
			}
			return  actionItem;
		}
		myFactory.indexSortCategories = function(){
			var sortCategories = [
				{title: "activity", tooltip: "by Latest Activity", icon: "fa fa-clock-o", sortExp: "lastActivity"},
				{title: "alphaAsc", tooltip: "Alphabetically in ascending order", icon: "fa fa-sort-alpha-asc", sortExp: "Title"},
				{title: "alphaDesc", tooltip: "Alphabetically in descending order", icon: "fa fa-sort-alpha-desc", sortExp: "-Title"}
			]
			return sortCategories
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
		connection.newNote = function(noteInfo){
			console.log('running the newNote function in the service',noteInfo);
			var firebase = new Firebase("https://sweltering-fire-6088.firebaseIO.com/meetingNotes");

			return firebase.push(noteInfo);
		}

		connection.getNote = function(noteID){
			console.log('now getting note with ID', noteID);
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetingNotes/"+noteID;
			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
		connection.getMeetingNotes = function(meetingID){
			console.log('now getting all notes for meeting', meetingID);
			var url = "https://sweltering-fire-6088.firebaseIO.com/meetingNotes";
			var ref = new Firebase(url);
			var notesRef = ref.orderByChild("meetingID").equalTo(meetingID);

			return $firebaseArray(notesRef);
		}

		return connection;

	}]);
