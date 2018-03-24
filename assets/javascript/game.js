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

// These handle the images
$("#breakfast").on("click", function(event) { location.href = "recipe.html?q=breakfast" });
$("#lunch").on("click", function(event) { location.href = "recipe.html?q=lunch"  });
$("#dinner").on("click", function(event) { location.href = "recipe.html?q=dinner" });
$("#fish-meals").on("click", function(event) { location.href = "recipe.html?q=fish meals" });
$("#vegan").on("click", function(event) { location.href = "recipe.html?q=vegan" });
$("#dessert").on("click", function(event) { location.href = "recipe.html?q=dessert" });

// These handle the search box
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

if(getUrlVars()["q"]) {
  searchRecipes(getUrlVars()["q"]);
}

$()

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
      var publisher = $("<a>");
      var recipeLink = $("<a>");
      var img = $("<img>");

      searchTitle.attr("href", result.recipes[i].source_url);
      $(searchTitle).append("<h3>" + result.recipes[i].title + "</h3>");
      $("#results").append(searchTitle);

      publisher.attr("href", result.recipes[i].publisher_url);
      $(publisher).append("<h4>(" + result.recipes[i].publisher + ")</h4>");
      $("#results").append(publisher);
       
      recipeLink.attr("href", result.recipes[i].source_url);
      $("#results").append(recipeLink);

      img.attr("src", result.recipes[i].image_url);
      $(recipeLink).html(img);

    }

 	})


  $("#search-locations").on("click", function(){
// $.ajax{
//     header: get,
//     url: asdfalsdjfj
// }
  const params = $.param({
    "query": $("#place-input").val() + " in Cleveland, OH",
    "key": "AIzaSyDOotByZwSbRmyaQlyEIjGbr8nZNG_kb44",
  })
  fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?' + params)
    .then(response => response.json())
    .then(data => {
      for(var i = 0; i < Math.min(10, data.results.length); i++) {
        var content = $("<div>");
        content.text(data.results[i].name);
        $(".panel-place").append(content);
      }
      console.log(data)
    })

   

  // photos = data.results[0].icon
  // console.log(photos)
  // $("#photos").html("<img src=" + photos + ">")
  });


}

});