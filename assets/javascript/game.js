$(document).ready(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHsse5do5Cb1VtRfdPxmAmiYmn_mE2XY4",
    authDomain: "chef-s-cabinet.firebaseapp.com",
    databaseURL: "https://chef-s-cabinet.firebaseio.com",
    projectId: "chef-s-cabinet",
    storageBucket: "",
    messagingSenderId: "117249764862"
  };
  firebase.initializeApp(config);

  //variable to rep the database
  var database = firebase.database();

 // array for standard img buttons


 //queryURL for food API
 var recipe = "breakfast"
 var queryURL = "http://food2fork.com/api/search?key=1e354f8c049c83ba15960786f9b9d70c&q=" + recipe;
 console.log(queryURL)

 //ajax request
 	$.ajax({
 		url: queryURL,
 		method: "GET"
 	}).then(function(result) {
 		console.log(result)
 	})

 //search button

 //clickable images

 //running video

//end .ready function	
});