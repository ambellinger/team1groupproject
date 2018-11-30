
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC95GzVPMw7xdUKOJj8zmnCEic9Q80DtJM",
        authDomain: "emailform-6dfa2.firebaseapp.com",
        databaseURL: "https://emailform-6dfa2.firebaseio.com",
        projectId: "emailform-6dfa2",
        storageBucket: "emailform-6dfa2.appspot.com",
        messagingSenderId: "509765417428"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //Button 
    $("#send").on("click", function (event) {
        event.preventDefault();
        alert("clicked");

        //Grabs user input
        var userName = $("#recipient-name").val().trim();
        var userEmail = $("#exampleInputEmail1").val().trim();

        var newUser = {
            name : userName,
            email : userEmail
        };

        //Push to database
        database.ref().push(newUser);

        //Clears input boxes
        $("#recipient-name").val("");
        $("#exampleInputEmail1").val("");


    });
