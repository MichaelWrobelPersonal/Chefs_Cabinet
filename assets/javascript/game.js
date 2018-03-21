$(document).ready(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHsse5do5Cb1VtRfdPxmAmiYmn_mE2XY4",
    authDomain: "chef-s-cabinet.firebaseapp.com",
    databaseURL: "https://chef-s-cabinet.firebaseio.com",
    projectId: "chef-s-cabinet",
    $storageBucket: "",
    messagingSenderId: "117249764862"
  };
  firebase.initializeApp(config);

  //variable to rep the database
  var database = firebase.database();

 // array for standard img buttons

function searchRecipes(recipe) {
 //queryURL for food API
 var APIKey = "1e354f8c049c83ba15960786f9b9d70c";
 var queryURL = "https://cors-anywhere.herokuapp.com/food2fork.com/api/search?key=" + APIKey + "&q=" + recipe;
 console.log(queryURL)

 //ajax request
 	$.ajax({
 		url: queryURL,
 		method: "GET",
    headers: {
      "Accept": "application/json"
    },
    dataType: "json"
 	}).then(function(result) {
 		console.log(result)

    $("#results").empty();

    for(var i = 0; i < Math.min(30, result.recipes.length); i++) {
      console.log(result.recipes[i].image_url);

      var searchTitle = $("<a>");
      searchTitle.attr("href", result.recipes[i].source_url);
      $(searchTitle).append("<h3>" + result.recipes[i].title + "</h3>");
      $("#results").append(searchTitle);
       
      var recipeLink = $("<a>");
      recipeLink.attr("href", result.recipes[i].source_url);
      $("#results").append(recipeLink);

      var img = $("<img>");
      img.attr("src", result.recipes[i].image_url);
      $(recipeLink).html(img);

    }

 	})
}

$("#search-recipes").on("click", function(event) {
  event.preventDefault();

  var inputRecipe = $("#recipe-input").val().trim();

  searchRecipes(inputRecipe);

  $("#recipe-input").val("");
})
 

 //////////////////////////////////
 // Get tweenty-five images 
 
 // Initial array of topics
 var topics = ["Breakfast", "Lunch", "Dinner", "Fish", "Vegetarian"];
 
 // Get images for the Topic method
 function getTopicImages() {
 
// TODO - replace GIPHY API with the FoodItem API, put this in a method as in the API TODO list and
//        and leave it to Kevin to fill in the API Issues.

     // The below code gets the images from the GIPHY API
     var api_key = "ZjebpqnjtPU1dcYD2xrpOO5nzMCLCi5K";
     var topic = $(this).attr("topic-name");
     // Example https://api.giphy.com/v1/gifs/search?api_key=ZjebpqnjtPU1dcYD2xrpOO5nzMCLCi5K&q=news&limit=10&offset=0&rating=G&lang=en
     var qeuryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";
 
     $.ajax({
         url: qeuryURL,
         method: "GET"
     }).then(function (response)
     {
         // Clear the images out
         $("#topic-images").empty();
         $("image-instructions").hide();  // Hide this msg while there are no images
 
         // Log the response data fro debugging
         console.log(response);
         console.log("Item Count: " + response.data.length);
         for (var i=0; i< response.data.length;i++)
         {
              console.log("For Item: " + i);
              console.log("Title: " + response.data[i].title);
              console.log("Recipe: " + response.data[i].rating);
              console.log("Nutrition: " + response.data[i].source);
              console.log("Image url: " + response.data[i].images.fixed_width.url);
              console.log("Image size: " + response.data[i].images.fixed_width.size);
              console.log("Movie url: " + response.data[i].images.fixed_width.mp4);
              console.log("Movie size: " + response.data[i].images.fixed_width.mp4_size);
              console.log("Image Heigth: " + response.data[i].images.fixed_width.height);
              console.log("Image Width: " + response.data[i].images.fixed_width.width);
 
             // Render images from the received data
             let topicInfo = new topicImage(
                 "topic-image-"+i,
                 response.data[i].title,
                 response.data[i].images.fixed_width.url,
                 response.data[i].images.fixed_width.mp4,
                 response.data[i].images.fixed_width.height,
                 response.data[i].images.fixed_width.width,
                 response.data[i].rating
             );
             topicInfo.renderImg();
          }
     });
 }
 
 
 // Function for displaying topic data
 // TODO- Remove, these as they are scofolding for until the 
 //       Topic info images get doen
 function renderButtons() {
 
     // Delete existing topics prior to adding new ones from the topics array
     $("#topic-buttons").empty();
     // Hide the image instructions as well
     $('image-instructions').fadeOut();
 
     // Loop through array of topics
     for (var i = 0; i < topics.length; i++) {
 
         // Generate buttons for each topic in the array
         var a = $("<button>");
         // Add the class
         a.addClass("topic");
         // Add the topic name
         a.attr("topic-name", topics[i]);
         // Add initial button text
         a.text(topics[i]);
         // Add button to the HTML
         $("#topic-buttons").append(a);
     }
 }

 function topicImage(id,title,still,movie,height,width,rating,animate)
 {
     this.id = id;
     this.title = title;
     this.photo = still.substring(0,still.length-4) + "_s.gif";
     this.image = still;
     this.movie = movie;
     this.width = width;
     this.height = height;
     this.rating = rating;
     this.animate = false;
     this.renderImg = function() {
 
     // create the figure
     var fig = $("<figure>");
        // Adding and ID
         fig.addClass("topic-figure");
     // create the image
     var elem = $("<img>");
         // Adding an ID
         elem.attr("Id", id);
         // Adding a class
         elem.addClass("topic-image");
         // Added src info to the image
         if (animate)
             elem.attr("src", this.image);
         else
             elem.attr("src", this.photo);
         console.log(this.photo);
         // Alternate text is the title
         elem.attr("alt", this.title);
         elem.attr("title", this.title);
 
         // Set the height and width
         elem.attr("height", this.height );
         elem.attr("width", this.width );
 
         // Add the image to the figure
         fig.append(elem);
 
         // Create the figure caption
         var capt = $("<figcaption>");
         capt.addClass("topic-title");
         let seperator = (this.title != "" ? ' - ' :'');
         capt.text(this.title + seperator + "rated " + this.rating);
 
         // Add the caption to the figure
         fig.append(capt);
   
         // Add the figure to the HTML
         $("#topic-images").append(fig);
         $("image-instructions").show();  // show this msg when there is at least one images
     };
 
 }
 
///////////////////////////////////////////////////////////
// TODO-Remove this scaffolding
// Ths is hear to substiture in for the 'Search' field.
//  Remove it when the topic buttons are removed
//
 // Add Topic Handler
 $("#add-topic").on("click", function (event) {
     event.preventDefault();
 
     // Put topic into array
     let topic = $("#topic-input").val().trim();
     if (topic.length == 0)
        return;              // Ignore empty inputs
     topics.push(topic);
 
     // Call button rendiring
     renderButtons();
     $('image-instructions').fadeIn();
 });
 ///////////////////////////////////////////////////////////

 // Function for displaying the topic images
 $(document).on("click", ".topic", getTopicImages);
 
 $(document).on("click", ".topic-image", function(event) {
     event.preventDefault();
     let srcUrl = $(this).attr('src');
     let srcUrlLen = srcUrl.length;
     let stillMarker = srcUrl.substring(srcUrlLen-6,srcUrlLen-4);
     console.log("srcUrl_before", srcUrl);
     console.log("srcUrlLen", srcUrlLen);
     console.log("stillMarker", stillMarker);
     if (srcUrl.substring(srcUrlLen-6,srcUrlLen-4) == "_s")
         srcUrl=srcUrl.substring(0,srcUrlLen-6) + ".gif";  // 'movie
     else
         srcUrl=srcUrl.substring(0,srcUrlLen-4) + "_s.gif"; // 'photo'
     console.log("srcUrl_after", srcUrl);
     $(this).attr('src', srcUrl);
  
 });
 
 // Call renderButtons function to display the initial buttons
 renderButtons();
/// Endof TweentyFiveImages changes ///

 //running video

//end .ready function	
});