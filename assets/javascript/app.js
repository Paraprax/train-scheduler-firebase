$(document).ready(function(){

     // initialization of firebase
     var config = {
        apiKey: "AIzaSyD4xVLwGmj5nkSvQUd-jrQEI9_sJ5EjAuA",
        authDomain: "function-junction-train-app.firebaseapp.com",
        databaseURL: "https://function-junction-train-app.firebaseio.com/",
        storageBucket: "function-junction-train-app.appspot.com"
      };
  
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    var train = { 
            name: "",
            destination: "",
            firstTime: 0,
            frequency: 0,
    }

    $("#submit-button").on("click", function(){

        console.log("aLl aBoARd!");

        event.preventDefault();

        train.name = $("#name-input").val().trim();
        train.destination = $("#destination-input").val().trim();
        train.firstTime = $("#first-train-input").val().trim();
        train.frequency = $("#frequency-input").val().trim();
  
        database.ref().push(train);
  
      });
    

}); // end of docready function