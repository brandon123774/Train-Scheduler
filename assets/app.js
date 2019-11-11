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
// function for the submit button
$("#submit").on("click", function (event) {
    event.preventDefault();

    //read in values for train info
    var trainName = $("#train-name").val().trim();
    var dest = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train").val().trim().calendar());
    var freq = $("#frequency").val().trim();
    var nextArrival = "";
    var minutesAway = "";

    // Code for pushing the data into the db
    dataRef.ref().push({
        trainName: trainName,
        dest: dest,
        firstTrainTime: firstTrainTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //empties out the text boxes for next time
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

var count = 0;

// Firebase watcher .on("child_added"
dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    // storing the snapshot.val() in a variable 
    var trainInfo = snapshot.val();

    //save into variables to use
    var trainName = childSnapshot.val().trainName;
    var dest = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().freq;

    // Console.loging the last user's data
    console.log(childSnapshot.trainName);
    console.log(childSnapshot.dest);
    console.log(childSnapshot.firstTrainTime);
    console.log(childSnapshot.freq);

    // Need to calculate the arrival time of the trains THISHERERERERERE

    //Create the new row(s) of train data from the form
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );

    //have to append these to the DOM on the table finally using jquery
    $("#train-table > tbody").append(newRow);

});