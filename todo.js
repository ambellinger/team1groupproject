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








