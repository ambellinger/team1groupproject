//*//Pseduocode//*//

//Connect to Firebase//

//Grab user Input from the search area and save that into a variable//

//Connect to APIs//

//EVENT ONE: USER TYPES INTO THE SEARCH BAR AND TWO COLUMNS APPEAR WITH RESULTS FROM TWO DIFFERENT APIS//
//Onclick function with the search bar and button//

//Recipe API//
    //Create query URL using the input seach area variable//
    // On-click function for submit button:
$("#submit-button").on("click", function(event) {

      //Empty left div//
      //Empty right div//
    // Prevents page from refreshing
    event.preventDefault();

    
//Recipe API//
 
    // Variables for the URL
    var keyword = $("#keyword-input").val().trim();
    //Create query URL using the input seach area variable//
    var queryURL = "https://api.edamam.com/search?q=" + keyword + "&from=0&to=5&app_id=59ec5ff0&app_key=d3912b55cf5347652819bac24659bbc8";


    // Appends a header to the user of their search of choice
    $("#results-display-recipe-api").append("<h4> You searched for: " + keyword + "</h4>");


    // AJAX Function to retrive recipe results
    function getRecipe(queryURL) {

          
    //AJAX Call//
      
     
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);

                var results = response.hits;
                for(var i = 0; i < results.length; i++) {
                    console.log(results[i].recipe.label);

                    // Parameters and attributes for the dynamic cardDiv
                    var cardDiv = $("<div class='card'>");
                        cardDiv.attr("style", "width: 18rem;");
                        cardDiv.css("float", "left");
                        cardDiv.css("margin", "15px");


                    // Attributes for the image, links and title - within the card
                    var image = $("<img>");
                        image.addClass("recipe-image");
                        image.attr("src", results[i].recipe.image);

                    var recipeLink = $("<a>");
                        recipeLink.attr("href", results[i].recipe.shareAs);

                    var recipeTitle = $("<p>").text(results[i].recipe.label);
                        recipeTitle.attr("class", "recipe-title");
                        recipeTitle.append(recipeLink);

                    cardDiv.append(recipeTitle);
                    cardDiv.append(image);
                    
                    // Function that appends 
                    $("#results-display-recipe-api").append(cardDiv);

                };

            });

    };

getRecipe(queryURL);


});
  
//Youtube API//
    //Create query URL using the input seach area variable//
    //AJAX Call//
        //Empty div//
        //Populate div with video stills from youtube//
            //Include name//
            //Include still image//
            //Description if necessary//

//EVENT TWO: USER SELECTS ONE OF THE RECIPES AND THE DETAILS PAGE EMERGES //
//Onclick function that interacts with selected recipe.//

//Displays the recipe in the left div//
    //Empty div//
    //Populate div with recipe from site//

//Displays the to-do list on the right; the to-do list is linked to the firebase database//
    //Empty div//
    //To do list appears//

//EVENT THREE: USER INPUTS DATA INTO TO-DO LIST//
    //INPUT DATA GOES INTO A FIREBASE DATABASE//
    //INPUT DATA APPENDS IN A LIST//
    