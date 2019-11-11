$(document).ready(function () {

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

    // Create a variable to reference the database
    var database = firebase.database();

    //create the variables to use for train table
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    // function for the submit button to add trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        //read in values for train info
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();
        // var nextArrival = "";
        // var minutesAway = "";


        // Code for pushing the data into the db
        database.ref().push(newTrain);
        //create a local variable for holding the train data
        var newTrain = {
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

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
        var nextArrival ;
        var minutesAway;

        //make train come up on time but use 1 year before so that there is a 'now' train

        var firstNewTrain = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1,"years");

        //make the difference in time between the current train and the first train

        var differenceTime = moment().diff(moment(firstNewTrain), "minutes");
        var remainder = differenceTime % childSnapshot.val().frequency;

        // minutes until the the train comes up

        var minutesAway = childSnapshot.val().frequency - remainder;

        //the arrival of the next train or the next train time

        var nextTrain = moment().add(minutesAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

         //Create the new row(s) of train data from the form
         var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway),
        );


        // storing the snapshot.val() in a variable 
        // var trainInfo = snapshot.val();

        //save into variables to use
        // var trainName = childSnapshot.val().trainName;
        // var dest = childSnapshot.val().trainDest;
        // var firstTrainTime = childSnapshot.val().trainFirstTrainTime;
        // var freq = childSnapshot.val().trainFreq;

        // Console.loging the last user's data
        // console.log(childSnapshot.trainName);
        // console.log(childSnapshot.dest);
        // console.log(childSnapshot.firstTrainTime);
        // console.log(childSnapshot.freq);

        // Need to make the calculations for the arrival time of the trains 

        

       

        //have to append these to the DOM on the table finally using jquery
        $("#train-table > tbody").append(newRow);

    });
});