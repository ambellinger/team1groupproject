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
    $("#leftdiv").append("<h4> You searched for: " + keyword + "</h4>");


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
                    $("#leftdiv").append(cardDiv);

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
    $(document).ready(function () {
        // Initialize Firebase
        // Make sure to match the configuration to the script version number in the HTML
        // (Ex. 3.0 != 3.7.0)
        // Initialize Firebase
      
        var config = {
          apiKey: "AIzaSyDkgUYhgpvwi8T6F9L8VqI6Al4bLuTQ7w4",
          authDomain: "cookit-208f6.firebaseapp.com",
          databaseURL: "https://cookit-208f6.firebaseio.com",
          projectId: "cookit-208f6",
          storageBucket: "cookit-208f6.appspot.com",
          messagingSenderId: "714250888418"
        };
        firebase.initializeApp(config);
      
      
        var database = firebase.database();
      
      
        $('#addItem').on('click', addItem);
        $('#todos').on('change', '.completeItem', completeItem);
        $('#todos').on('click', '.deleteItem', deleteItem);
        $('#newTodo').on('keypress', function (event) {
          // console.log(event);
          // Don't refresh the page! so the data retains
          if (event.which === 13) {
            addItem();
            event.preventDefault();
          }
      
        });
      
        // function that adds new task and displays the input in the todos area
        function addItem(event) {
          var newTodoText = $('#newTodo').val();
      
      //Need to add the id field in your firebase
      // you need this id field to identify your selected row
          //calling firebase 
          database.ref().push({
            Todo: newTodoText,
            id: (new Date().getTime()).toString(36) 
          });
      //When you finished adding, you need to clear out
      // the input textbox
           $('#newTodo').val("");
        }
      
        // function to remove the task
        function deleteItem(event) {
          
          //this delete the row from the list not the firebase
          $(this).parent().remove();
      
      
          //this gets the current selected row id 
          // from the unordered list
          console.log($(this).attr("id"));
        
      //this calls the firebase to delete the selected id row
          firebase.database().ref().orderByChild('id').equalTo($(this).attr("id")).once("value").then(function (snapshot) {
            snapshot.forEach(function (child) {
       //this remove the selected child row
              child.ref.remove();
        
            }); // a closure is needed here
          }).then(function () {
            console.log("Removed!");
      
           
          });
           
        }
      
        // function to mark the task done
        function completeItem(event) {
          $(this).parent().toggleClass('done');
        }
      
      
       //this render or refresh the page when it loads up,
       //add todo item, or remove todo item
          database.ref().on("child_added", function (snapshot) {
      
            var sv = snapshot.val();
      
            // Console.loging the last user's data
            console.log(sv.Todo);
             //span has id from the firebase field called id
            $('#todos').append('<li><input class = "completeItem" type ="checkbox">' + sv.Todo 
            + '<span id="' + sv.id + '" class = "glyphicon glyphicon-trash deleteItem"></span></li>');
      
      
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
      
      });      


//EVENT THREE: USER INPUTS DATA INTO TO-DO LIST//
    //INPUT DATA GOES INTO A FIREBASE DATABASE//
    //INPUT DATA APPENDS IN A LIST//
    
//MODAL//
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })