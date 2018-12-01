$(document).ready(function(){

    // this file is how we connect with the youtube api
    
    // this function will be used to search the YouTube API with the userSearch as its argument
    function searchYouTube(userSearch){

        // Clears the necessary divs prior to displaying the search results
        $("#introarea").empty();
        $("#title-recipe-results").empty();
        $("#title-youtube-results").empty();
        $("#results-display-recipe-api").empty();
        $("#results-display-youtube-api").empty();
        $("#todoDiv").hide();
    
        // the search term applied to the ajax call is the user's and is being passed through the function
        var searchTerm = userSearch;
        
        // personal API key granted by YouTube
        var apiKEY = "&key=AIzaSyDpWKvpsuH5kB8LRiI2KFGL3DdqwW5aC7M"
    
        // search query to be used
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm + apiKEY;
    
        // jquery ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
    
        })
       
        // once we have a successful response from the API...
        .then(function(response){
    
            // store the results in a var
            var results = response.items;
    
            // loop through the results for as long as the list of results (5) and do the following...
            for(var i = 0; i < results.length; i++) {
    
                // video snippet will be displayed as a thumbnail
                var video = results[i].snippet.thumbnails.medium.url;
    
                // title of each video respective to the thumbnail
                var videoTitle = results[i].snippet.title;
    
                // dynamically create a new div with the source as the previous thumbnail url
                var resultsDisplayed = $("<img class='user-pick'>").attr("src", video);

                // add the id youtube-results to the results displayed
                resultsDisplayed.attr("id", "youtube-results")
    
                // retrieve the corresponding video ID and title of the video
                resultsDisplayed.attr("data-id", results[i].id.videoId);
    
                // attach all the previously attained info to the div created earlier
                resultsDisplayed.append(video);

                // display the title identifying the youtube videos
                $("#title-youtube-results").html("<h1>Video Results</h1>");
           
                // display the thumbnails on the pre-existing div
                $("#results-display-youtube-api").append("<h5>"+ videoTitle + "</h5>", "<br>",  resultsDisplayed);
            
            }
    
    
        });
    
    };
    
    // code to be run when the user clicks the search button
    $("#submit-button").on("click", function(event){
        
        // prevent the form from reloading the page
        event.preventDefault();

        // user-input validation: search box cannot be empty, if it is then pop up a modal explaining to input a valid search term
        if ($("#keyword-input").val().trim()===""){

                $("#empty-search-modal").modal("show");
            }
 
        // if user entered something into the search field, then...
        else{
    
            // store the user input search term in a var and eliminate any whitespace before and after the term
            var userSearch = $("#keyword-input").val().trim();
    
            // initiate the searchYouTube function and pass through the userSearch var as an argument
            searchYouTube(userSearch);
        }
    });
    
    // this function will display the youtube video on the page
    function selectVideo(){

        // Clears the divs prior to displaying the search results
        $("#title-recipe-results").empty();
        $("#title-youtube-results").empty();
        $("#results-display-recipe-api").empty();
        $("#results-display-youtube-api").empty();
    
        // retrieve the data-id attribute from the thumbnail being clicked and store it
        var imgId = $(this).attr("data-id");
    
        // dynamically create a new iframe element
        var player = $("<iframe>");
    
        // add width and height specifications to the video player
        // player.css("width", "640");
        // player.css("height", "360");
        player.css("width", "640");
        player.css("height", "360");
        player.css("padding", "25");
        player.css("margin", "0");
    
        //add an id, type, source and frameborder attibute to the video player 
        player.attr("type", "text/html");
        player.attr("id", "ytplayer");
    
        // the video being displayed will have the imgId as its videoId
        player.attr("src", "https://www.youtube.com/embed/"+ imgId +"?autoplay=1&origin=https://example.com");
        player.attr("frameborder", "0");
       
        // display the video on the left side of the screen
        $("#results-display-recipe-api").append(player);
    
    };
    
    
    // since the video thumbnails will be dynamically created, then add an on-click function to 
    // the img element tag and run the selectVideo function
    $(document).on("click", "#youtube-results", selectVideo);
    
    
});