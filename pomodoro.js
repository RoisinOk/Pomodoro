/**
 * Created by roisinokeeffe on 27/07/2015.
 */

//The set interval method of the window object is a loop. It carries out a function every specified number of
//milliseconds. It takes two parameters, the first is a function, the second is a number of milliseconds.
//1 second = 1000 milliseconds

var timerVar;    //Needs global variable so clearInterval can reference it
var start;                              //Declare variable for start time
var secsElapsed;                        //Declare variable for elapsed secs
var minsElapsed;                        //Declare variable for elapsed mins

var secsLeft = 120;                      //sets seconds to 60. Counts down from this number.
var minsLeft = secsLeft/60;             //Amount of minutes in secsLeft

function startTimer(){
    timerVar = window.setInterval(function(){ myTimer() }, 100);
    start = new Date().getTime();       //Return the number of milliseconds since midnight 1970/01/01
}

function myTimer(){
    var time = new Date().getTime() - start;                        //Gets amount of milliseconds that have passed since start
    secsElapsed = Math.floor(time / 1000);                          //Rounds number to a second
    minsElapsed = (Math.floor(time / 1000)/60);                     //Converts to minutes to show amount of minutes that have passed
    var secsDisplay = (secsLeft -(secsElapsed))%60;                 //Seconds left, minus seconds elapsed. Displays remainder after divided by 60.
    var minsDisplay = Math.floor( minsLeft -(minsElapsed));         //Displays starting amount of mins, minus mins elapsed.
    if (secsDisplay<10){                                                    //Checks if secsDisplay is single digit
        document.getElementById("secsDiv").innerHTML = "0"+secsDisplay;     //Adds zero before if single
    }else{
        document.getElementById("secsDiv").innerHTML = secsDisplay;         //Displays normally if not.
    }
    if (minsDisplay<10){                                                    //Checks if minsDisplay is single digit
        document.getElementById("minsDiv").innerHTML = "0"+minsDisplay;     //Adds zero before it if single
    }else{
        document.getElementById("minsDiv").innerHTML = minsDisplay;         //Displays normally if not.
    }
}//end of function myTimer

function pauseTimer(){
    secsLeft = secsLeft -(secsElapsed);
    minsLeft = minsLeft -(minsElapsed);
    clearInterval(timerVar);            //stops the timerVar setInterval method from running
}

//Function resumeTimer is the same as start timer, but secs and start variables are updated.
function resumeTimer(){
    start = new Date().getTime();                                   //updates start variable to new current time millisecs
    timerVar = window.setInterval(function(){ myTimer() }, 100);    //runs timer var function again with new secs (from pause function)
};

