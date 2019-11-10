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
    // Code for handling the push
    dataRef.ref().push({
        trainName: trainName,
        dest: dest,
        firstTrainTime: firstTrainTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

var count = 0;

// Firebase watcher .on("child_added"
dataRef.ref().on("child_added", function (childSnapshot) {
    count++

    // storing the snapshot.val() in a variable for convenience
    var trainInfo = snapshot.val();
    // Console.loging the last user's data
    console.log(childSnapshot.trainName);
    console.log(childSnapshot.dest);
    console.log(childSnapshot.firstTrainTime);
    console.log(childSnapshot.freq);
    var row = $("<tr>");
    var col = $("<td>");
    $(row).append("<td>" + childSnapshot.trainName + "</td>" + "<td>" + childSnapshot.dest + "</td>" + "<td>" + childSnapshot.firstTrainTime + "</td>" + "<td>" + childSnapshot.freq + "</td>" + "<td>");

    // $("#tableEmp").append(row)
   });