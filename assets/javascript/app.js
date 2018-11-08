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

    var time; // time variable is declared

    function setTime() { //function sets time using moment.js and updates the clock HTML
        time = moment().format('h:mm:ss a');
        $("#clock").html(time);
    }

    setTime(); //initial function call to set time on pageload
    setInterval(function(){ setTime(); }, 1000); //setTime is called again once per second
  
    var train = { // object to hold user-submitted values for new trains
            name: "",
            destination: "",
            firstTime: 0,
            frequency: 0,
            perDay: 0,
    }

    //'click' function to submit four values to the keys of the train object:
    $("#submit-button").on("click", function(){ 

        console.log(time);

        console.log("aLl aBoARd!"); //verifier

        event.preventDefault();

        // set the four values in the train object
        train.name = $("#name-input").val().trim(); 
        train.destination = $("#destination-input").val().trim();
        train.firstTime = $("#first-train-input").val().trim();
        train.frequency = $("#frequency-input").val().trim();
        train.perDay = $("#per-day-input").val().trim();
  
        database.ref().push(train); //pushes the train object with its four new values to the database referenced earlier
  
      });


      //'child-added' function to update the HTML based on new values in the database:
      database.ref().on("child_added", function(stored_train) { 
                                                          //use "child_added" instead of "value", because 
                                                          //we're using "push" to ADD to the database instead 
                                                          //of "set" to CHANGE the data in it

        console.log("*train whistle noise*"); //verifier
        console.log(stored_train.val());

        // here we will calculate 'next arrival' based on frequency and current time: - - - - - - -

        //variable-creep warning....

        var firstTrainTimeInt = Number(stored_train.val().firstTime); // use js native "Number()" method to turn values from strings into integers that can be math'd
        var frequencyMinsInt = Number(stored_train.val().frequency); // ''
        var trainsPerDayInt = Number(stored_train.val().perDay);


        var TimeStringFormat = String(firstTrainTimeInt/100) + ":00:00"; //divide the input number (eg. "0800") by 100 to produce
                                                                    //a two-digit number, and convert it to a string with the 
                                                                    //minutes and seconds tacked on for moment.js formatting later

        console.log(time);


        var nextTrain = moment(TimeStringFormat, "h:mm:ss").fromNow();
        
        var minutesAway = moment(nextTrain, 'h:mm:ss a').fromNow(); //var is defined using fromNow method on nextTime data
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        // turn the values from the train object into HTML elements:
        var tableRow = $("<tr>");
        tableRow.append("<td>" + stored_train.val().name + "</td>");
        tableRow.append("<td>" + stored_train.val().destination + "</td>");
        tableRow.append("<td>" + stored_train.val().frequency + "</td>");
        tableRow.append("<td>" + nextTrain + "</td>");
        tableRow.append("<td>" + minutesAway + "</td>");


        $("tbody").append(tableRow); // add the new row of HTML data to the table body

    });
    
//use setInterval to update the last two columns once per second too!


}); // end of docready function