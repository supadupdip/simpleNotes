angular.module('SimpleNotes')
	.factory('meetingFactory', function(){
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
				lastActivity: null,
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
			var today = new Date();
			var day = today.getDate();
			var month = today.getMonth();
			month += 1;
			var year = today.getFullYear();
			var fullDate = month+"/"+day+"/"+year;

			var note = {
				meetingID: null,
				meetingTitle: null,
				meetingDate: fullDate
				//noteCards: [],	//Need to comment this out for FireBase
			};
			return note;
		};

		myFactory.getNoteCard = function(){
			var noteCard= {
				topicTitle: null,
				topicDetails : null,
				actionItems : []
			}
			return noteCard;
		};
		myFactory.getActionItem = function(){
			var actionItem={
				complete: false,
				details: null,
				mentions: []
			}
			return  actionItem;
		};
		myFactory.indexSortCategories = function(){
			var sortCategories = [
				{title: "activity", tooltip: "by Latest Activity", icon: "fa fa-clock-o", sortExp: "lastActivity"},
				{title: "alphaAsc", tooltip: "Alphabetically in ascending order", icon: "fa fa-sort-alpha-asc", sortExp: "Title"},
				{title: "alphaDesc", tooltip: "Alphabetically in descending order", icon: "fa fa-sort-alpha-desc", sortExp: "-Title"}
			]
			return sortCategories
		};
		return myFactory;

	})
	.factory('connectionFactory', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
		var connection = {};
		var baseURL = "https://sweltering-fire-6088.firebaseIO.com";
		connection.getAllMeetings = function(){
			var url = baseURL + "/meetings";
			var ref = new Firebase(url);
			return $firebaseArray(ref);
			//return ref;

		}
		connection.newMeeting = function(meeting){
			//console.log(meeting);
			var fireBase = new Firebase(baseURL + "/meetings");
			//var datapush = fireBase.push(meeting);
			//var meetingID = datapush.key();
			////console.log(meetingID);

			return fireBase.push(meeting);
		}

		connection.getMeeting = function(meetingID){
			//console.log('now getting meeting with ID', meetingID);
			var url = baseURL + "/meetings/"+meetingID;
			var ref = new Firebase(url);

			return $firebaseObject(ref);

		}

		connection.updateMeeting = function(meetingID){
			//console.log('now updating meeting with ID', meetingID);
			var wasSuccessful = false;
			var url = baseURL+"/meetings/"+meetingID;
			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
		connection.newNote = function(noteInfo){
			//console.log('running the newNote function in the service',noteInfo);
			var firebase = new Firebase(baseURL+"/meetingNotes");

			return firebase.push(noteInfo);
		}

		connection.getNote = function(noteID){
			//console.log('now getting note with ID', noteID);
			var url = baseURL+"/meetingNotes/"+noteID;
			var ref = new Firebase(url);

			return $firebaseObject(ref);
		}
		connection.getMeetingNotes = function(meetingID){
			//console.log('now getting all notes for meeting', meetingID);
			var url = baseURL+"/meetingNotes";
			var ref = new Firebase(url);
			var notesRef = ref.orderByChild("meetingID").equalTo(meetingID);

			return $firebaseArray(notesRef);
		}

		return connection;

	}]);
