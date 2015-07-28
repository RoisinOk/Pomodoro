/**
 * Created by roisinokeeffe on 27/07/2015.
 */

//The set interval method of the window object is a loop. It carries out a function every specified number of
//milliseconds. It takes two parameters, the first is a function, the second is a number of milliseconds.
//1 second = 1000 milliseconds

var timerVar = window.setInterval(function(){ myTimer() }, 100);    //Needs global variable so clearInterval can refernce it

var start = new Date().getTime();       //Return the number of milliseconds since midnight 1970/01/01
var secsElapsed;                        //Declare variable for elapsed secs
var minsElapsed;                        //Declare variable for elapsed mins

var secsLeft = 120;                      //sets seconds to 60. Counts down from this number.
var minsLeft = secsLeft/60;             //Amount of minutes in secsLeft

function myTimer(){
    var time = new Date().getTime() - start;                        //Gets amount of milliseconds that have passed since start
    secsElapsed = Math.floor(time / 1000);                          //Rounds number to a second
    minsElapsed = (Math.floor(time / 1000)/60);                     //Converts to minutes to show amount of minutes that have passed
    document.getElementById("secsDiv").innerHTML = (secsLeft -(secsElapsed))%60;            //Seconds left, minus seconds elapsed. Displays remainder after divided by 60.
    document.getElementById("minsDiv").innerHTML = Math.floor( minsLeft -(minsElapsed));    //Displays starting amount of mins, minus mins elapsed.
}//end of function myTimer

function pauseTimer(){
    clearInterval(timerVar);            //stops the timerVar setInterval method from running
}

//Function resumeTimer is the same as start timer, but secs and start variables are updated.
function resumeTimer(){
    secsLeft = document.getElementById("time").innerHTML;               //updates global variable 'secs' to time countdown stops (string)
    secsLeft = parseInt(secsLeft);                                          //parses this string to an integer
    start = new Date().getTime();                                   //updates start variable to new current time millisecs
    timerVar = window.setInterval(function(){ myTimer() }, 100);    //runs timer var function again with new secs (from pause function)
};

