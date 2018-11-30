$(document).ready(function(){

    // //*//Pseduocode//*//
    
    //Connect to Firebase//
    
    //Grab user Input from the search area and save that into a variable//
    
    //Connect to APIs//
    
    //EVENT ONE: USER TYPES INTO THE SEARCH BAR AND TWO COLUMNS APPEAR WITH RESULTS FROM TWO DIFFERENT APIS//
    //Onclick function with the search bar and button//
    
    //Recipe API//
        //Create query URL using the input seach area variable//
    
    // On-click function for submit button:
    var dynamicRecipeDiv;
    
    $("#submit-button").on("click", function(event) {
    
    
        // Prevents page from refreshing
        event.preventDefault();

        if ($("#keyword-input").val().trim()===""){

            $("#my-modal").modal("show")
        }
 
        else{
    
        // Should empty the search result DIVs
        $("#title-recipe-results").empty();
        $("#results-display").empty();
        $("#results-display-recipe-api").empty();
        $("#results-display-youtube-api").empty();
        $("#todoDiv").hide();
    
        
    //Recipe API//
     
        // Variables for the URL
        var keyword = $("#keyword-input").val().trim();
        //Create query URL using the input seach area variable//
        var queryURL = "https://api.edamam.com/search?q=" + keyword + "&from=0&to=5&app_id=59ec5ff0&app_key=d3912b55cf5347652819bac24659bbc8";
    
    
        // Appends a header to the user of their search of choice
        $("#title-recipe-results").prepend("<h4>Recipes for: " + keyword + "</h4>");
    
    
        // ***** AJAX Function to retrive recipe results
        function getRecipe(queryURL) {
    
              
            //AJAX Call//
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function(response) {
                    console.log(response);
    
                    var results = response.hits;
    
                   
                                // Function #1 --- for populating search results with card.
                                for(var i = 0; i < results.length; i++) {
                                    console.log(results[i].recipe.label);
                                    
    
    
                                    // Parameters and attributes for the dynamic cardDiv
                                    var cardDiv = $("<div class='recipeclass user-pick'>");
                                        cardDiv.attr("style", "border: none;");
                                        cardDiv.attr("data-id", results[i].recipe.label);
                                        cardDiv.attr("data-image", results[i].recipe.image);
                                        cardDiv.attr("data-url", results[i].recipe.url);
                                        cardDiv.attr("id", "recipe-result");
                                        cardDiv.css("float", "left");
                                        cardDiv.css("margin", "15px");
    
    
                                    // Attributes for the image, links and title - within the card
                                    var image = $("<img>");
                                        image.addClass("recipe-image text-center recipe-result");
                                        image.attr("src", results[i].recipe.image);
                                       //image.css("height", "100%");
                                       //image.css("width", "100%");
    
    
                                    var recipeLink = $("<a>");
                                        recipeLink.addClass("recipe-title recipe-result");
                                        recipeLink.attr("data-id", results[i].recipe.label);
                                        recipeLink.text(results[i].recipe.label);
    
    
    
                                    // Creates the table for the ingredient-list.
                                    var ingredientTable = $("<ul>");
    
                                    var ingredient;
                                    for(var x = 0; x < results[i].recipe.ingredientLines.length; x++) {
                                        console.log("Ingredient: " + results[i].recipe.ingredientLines[x]);
                                        ingredient = $("<li>").html("&#9642; " + results[i].recipe.ingredientLines[x]);
                                        ingredientTable.append(ingredient);
                                    };
                                 
    
                                    // Assigns ingredientTable to the global variable.
                                    dynamicRecipeDiv = ingredientTable;
    
    
    
    
                                    // Append all our created elements into our HTML.
                                    cardDiv.append(recipeLink);
                                    cardDiv.append(image);
                                    
                                    $("#results-display-recipe-api").append(cardDiv);
    
                                };
    
    
    
                            
        
        
    
                });
    
        };
    
    
        
    
    getRecipe(queryURL);
    
    }
    
    });
    
    
    function showRecipe() {
    
        // cardDiv.on("click", function() {
            console.log("Function showRecipe() now works");
    
    
            // Clears the divs prior to displaying the search results
            $("#title-recipe-results").empty();
            $("#title-youtube-results").empty();
            $("#results-display-recipe-api").empty();
            $("#results-display-youtube-api").empty();
    
            event.preventDefault();
    
    
            // Creating a variable to call the attributes of cardDiv
            var recipeTitle = $(this).attr("data-id");
            var recipeImg = $(this).attr("data-image");
            var recipeURL = $(this).attr("data-url");
    
    
            // Creating a new div to display our selected recipe results.
            var displayRecipeImage = $("<img>");
            displayRecipeImage.attr("src", recipeImg);
    
            var displayRecipeURL = $("<button>");
            displayRecipeURL.addClass("btn");
            displayRecipeURL.attr("onclick", "window.location.href='" + recipeURL + "'");
            displayRecipeURL.attr("type", "button");
            displayRecipeURL.text("Click Here For Instructions");
            displayRecipeImage.css("clear", "both");
    
    
    
            // Append all created elements onto our HTML.
            $("#title-recipe-results").append("<h2>" + recipeTitle + "</h2>");
            $("#results-display-recipe-api").append(displayRecipeImage);
           
            $("#results-display-recipe-api").append("<h2>Ingredients:</h2><br>", dynamicRecipeDiv);
             $("#results-display-recipe-api").append(displayRecipeURL);
    
        // });
    };
    
    
    $(document).on("click", "#recipe-result", showRecipe);
    
      
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
    
        // please see the function #2 within submit button on-click
        
        
        
    
    //Displays the recipe in the left div//
        //Empty div//
        //Populate div with recipe from site//
    
    //Displays the to-do list on the right; the to-do list is linked to the firebase database//
        //Empty div//
        //To do list appears//
    
    //EVENT THREE: USER INPUTS DATA INTO TO-DO LIST//
        //INPUT DATA GOES INTO A FIREBASE DATABASE//
        //INPUT DATA APPENDS IN A LIST//
        
    
    });