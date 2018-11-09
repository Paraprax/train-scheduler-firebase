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

        

        // now to calculate 'next arrival' based on frequency and current time: - - - - - - -

        //variable-creep warning....

        // ~~~~~ NEW ATTEMPT: ~~~~~~ 

        // Assumptions
    var trainFrequency = stored_train.val().frequency;
    var firstTrain = stored_train.val().firstTime;
 

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "LT").subtract(1, "years");

    // Current Time


    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes"); //minutes between the first train and the current time

    // Time apart
    var timeRemainder = (diffTime % trainFrequency); //divide number of minutes since the first train by the number of minutes it takes for each train to arrive, and give the remainder, which will then be subtracted from the frequency(min) to find the # of minutes until the next train
    

    // Minute Until Train
    var minutesAway = (trainFrequency - timeRemainder);

    // Next Train arrival time
    var nextTrain = moment().add(minutesAway, "minutes").format("LT");


        // turn the values from the train object into HTML elements:
        var tableRow = $("<tr>");
        tableRow.append("<td>" + stored_train.val().name + "</td>");
        tableRow.append("<td>" + stored_train.val().destination + "</td>");
        tableRow.append("<td>" + stored_train.val().frequency + "</td>");
        tableRow.append("<td>" + nextTrain + "</td>");
        tableRow.append("<td class='minutesAway'>" + minutesAway + "</td>");


        $("tbody").append(tableRow); // add the new row of HTML data to the table body

        
    });

    setTimeout(function() { displayMinutesAway() }, 5000);
    
    function displayMinutesAway() { //function sets time using moment.js and updates the clock HTML

        $(".minutesAway").each(function() {
            var timeDataHTML = $(this);

            setInterval(function(){
                console.log( timeDataHTML.html() )
                var newValue = (Number(timeDataHTML.html()) - 1);
                timeDataHTML.html(newValue); //update the html
            }, 60000);

        })
        
    
    };

}); // end of docready function

