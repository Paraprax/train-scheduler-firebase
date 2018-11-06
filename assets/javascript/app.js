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
  
    var train = { // object to hold user-submitted values for new trains
            name: "",
            destination: "",
            firstTime: 0,
            frequency: 0,
    }

    //'click' function to submit four values to the keys of the train object:
    $("#submit-button").on("click", function(){ 

        console.log("aLl aBoARd!"); //verifier

        event.preventDefault();

        // set the four values in the train object
        train.name = $("#name-input").val().trim(); 
        train.destination = $("#destination-input").val().trim();
        train.firstTime = $("#first-train-input").val().trim();
        train.frequency = $("#frequency-input").val().trim();
  
        database.ref().push(train); //pushes the train object with its four new values to the database referenced earlier
  
      });

      //'child-added' function to update the HTML based on new values in the database:
      database.ref().on("child_added", function(snapshot) { 
                                                          //use "child_added" instead of "value", because 
                                                          //we're using "push" to ADD to the database instead 
                                                          //of "set" to CHANGE the data in it

        console.log("*train whistle noise*"); //verifier

        // turn the values from the train object into HTML elements:
        var tableRow = $("<tr>");
        tableRow.append("<td>" + train.name + "</td>");
        tableRow.append("<td>" + train.destination + "</td>");
        tableRow.append("<td>" + train.frequency + "</td>");

        $("tbody").append(tableRow); // add the new row of HTML data to the table body

    });
    

}); // end of docready function