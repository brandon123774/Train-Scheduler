// link to Firebase configuration 
var firebaseConfig = {
    apiKey: "AIzaSyBwmsWLnuJFQguHEsQEIW-BDmstVT--HPA",
    authDomain: "train-scheduler-b340a.firebaseapp.com",
    databaseURL: "https://train-scheduler-b340a.firebaseio.com",
    projectId: "train-scheduler-b340a",
    storageBucket: "train-scheduler-b340a.appspot.com",
    messagingSenderId: "708995185463",
    appId: "1:708995185463:web:42eecefcf1e718cf3fb8b2",
    measurementId: "G-LDN5911WE1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


// Create a variable to reference the database
var database = firebase.database();

// function for the submit button to add trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //read in values for train info
    var trainName = $("#train-name").val().trim();
    var dest = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train").val().trim().calendar());
    var freq = $("#frequency").val().trim();
    var nextArrival = "";
    var minutesAway = "";

    //create a local variable for holding the train data
    var newTrain =  {
        name: trainName,
        destination: trainDest,
        firstTrain: trainfirstTrainTime, 
        frequency: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // Code for pushing the data into the db
    database.ref().push(newTrain);
    
    //create an alert to notify that a new train has been added
    alert("Train has been added");


    //empties out the text boxes for next time
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// var count = 0;

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    // storing the snapshot.val() in a variable 
    var trainInfo = snapshot.val();

    //save into variables to use
    var trainName = childSnapshot.val().trainName;
    var dest = childSnapshot.val().trainDest;
    var firstTrainTime = childSnapshot.val().trainFirstTrainTime;
    var freq = childSnapshot.val().trainFreq;

    // Console.loging the last user's data
    // console.log(childSnapshot.trainName);
    // console.log(childSnapshot.dest);
    // console.log(childSnapshot.firstTrainTime);
    // console.log(childSnapshot.freq);

    // Need to make the calculations for the arrival time of the trains 

    // have to take an asumption
    var trainFrequency = 9;

    // Time is set to 6:45 AM
    var firstTime = "6:45";

    // First Time it comes around (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time (present)
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + differenceTime);

    // Time apart (remainder)
    var trainRemainder = differenceTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var trainMinutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(trainMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Create the new row(s) of train data from the form
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );

    //have to append these to the DOM on the table finally using jquery
    $("#train-table > tbody").append(newRow);

});