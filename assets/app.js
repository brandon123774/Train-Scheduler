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
$("#submit").on("click", function (event) {
    event.preventDefault();
    //read in values for train info
    var trainName = $("#t-name").val().trim();
    var dest = $("#d-destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var freq = $("#f-frequency").val().trim();
    var nextArrival = "";
    var minutesAway = "";
    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        dest: dest,
        firstTrainTime: firstTrainTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var trainInfo = snapshot.val();
    // Console.loging the last user's data
    console.log(trainInfo.trainName);
    console.log(trainInfo.dest);
    console.log(trainInfo.firstTrainTime);
    console.log(trainInfo.freq);
    var row = $("<tr>");
    var col = $("<td>");
    $(row).append("<td>" + trainInfo.trainName + "</td>" + "<td>" + trainInfo.dest + "</td>" + "<td>" + trainInfo.firstTrainTime + "</td>" + "<td>" + sv.monthsWorked + "</td>" + "<td>" + sv.monthlyRate + "</td>" + "<td>" + trainInfo.freq + "</td>");

    $("#tableEmp").append(row)
   });