# Train-Scheduler

## Table of Contents
* Introduction
* Interesting bits of code
* Technologies Used
* How to use


## Introduction
The idea of the program is to be able to create a train schedule so that one can search the name of a train, a destination, the frequency, and the time, then they will be able to see the next arrival of that train and how many minutes away it is from arrival.

## Bits of code 
//This allows the user to link the application to the firebase database so that the developer can see activity as well as to have the application data save to a location
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

//Calculations that are needed to make the arrival time and minutes away work
        var nextArrival;
        var minutesAway;

        //make train come up on time but use 1 year before so that there is a 'now' train
        var firstNewTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");

        //make the difference in time between the current train and the first train
        var differenceTime = moment().diff(moment(firstNewTrain), "minutes");
        var remainder = differenceTime % childSnapshot.val().frequency;

        // minutes until the the train comes up
        var minutesAway = childSnapshot.val().frequency - remainder;

        //the arrival of the next train or the next train time
        var nextTrain = moment().add(minutesAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

	
## Technologies
Project is created using the following:
* HTML
* CSS
* Javascript
* Bootstrap
* JQuery
* moment.js
* Firebase database

# How to use
Fill out the form at the end of the page, click submit, and then results from the search will display.

	