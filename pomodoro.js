/**
 * Created by roisinokeeffe on 27/07/2015.
 */



var timerVar;                       //Needs global variable so clearInterval can reference it
var start;                              //Declare variable for start time
var secsElapsed;                        //Declare variable for elapsed secs
var minsElapsed;                        //Declare variable for elapsed mins

var totalSecs = 0;                      //Declare variable to hold total amount of seconds. It is added to as seconds elapse, and
                                        //retained through pause and play. Only

var workSecsLeft = 1500;                     //sets seconds to 60. Counts down from this number.
var workMinsLeft = workSecsLeft/60;        //Amount of minutes in workSecsLeft
var workPlaying = false;                   //Boolean. False = timer paused. True = timer running

var breakSecsLeft = 300;
var breakMinsLeft = breakSecsLeft/60;

//===============================================================================================================================
//Function myTimer - Timer counts down minutes and seconds of session, and calls function to end session at end.
//===============================================================================================================================

function myTimer(secsLeft, minsLeft, endSessionFunction){

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

    if(minsDisplay<=0 && secsDisplay<=0){                           //if minutes and seconds are at zero (if time is up)
        minsDisplay==0;
        secsDisplay==0;
        endSessionFunction();                                       //Calls endWorkSession function
    }
}//end of function myTimer

//===============================================================================================================================
//Function playWorkTimer starts the myTimer. It's called when play or resume is pressed.
//===============================================================================================================================

function playWorkTimer(){
    secsElapsed=0;
    start = new Date().getTime();                                           //Return the number of milliseconds since midnight 1970/01/01
    timerVar = window.setInterval(function(){ myTimer(workSecsLeft, workMinsLeft, endWorkSession) }, 100);    //Runs timer
    workPlaying = true;
    document.getElementById("clock").className="working";//Sets workPlaying boolean to true
}


//===============================================================================================================================
//Function pauses timer. Called when pause is pressed.
//===============================================================================================================================
function pauseTimer(){
    workSecsLeft = workSecsLeft -(secsElapsed);         //Updates amount of secs left in timer (global variable) to new amount
    workMinsLeft = workMinsLeft -(minsElapsed);         //Updates amount of mins left in timer (global variable) to new amount
    clearInterval(timerVar);                            //stops the timer from running
    totalSecs = totalSecs + secsElapsed;                //Updates the total seconds count global variable to add on seconds just elapsed
    workPlaying = false;                                //Changes workPlaying boolean to false
    document.getElementById("clock").className="none";
}

//===============================================================================================================================
//Function playPause() checks whether play or pause was pressed on toggle button, and runs appropriate function
//===============================================================================================================================

function playPause(){                                       //Runs when play/pause button is pressed
    if(workPlaying){                                        //If already Playing
        pauseTimer();                                       //Pause timer
        document.getElementById("playPause").innerHTML="  Play  ";   //Show the play button, and hide pause

    }else{                                                  //If not workPlaying
        playWorkTimer();                                    //Play the work timer
        document.getElementById("playPause").innerHTML="  Pause ";
    }
}

//===============================================================================================================================
//Function stopTimer() called when stop button is pressed
//===============================================================================================================================

function stopTimer(){                                                                                   //Stops timer running
    clearInterval(timerVar);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    if(workPlaying){                                //if the timer had been workPlaying when button pressed,
        totalSecs = totalSecs + secsElapsed;    //the last seconds elapsed need to be added onto total seconds
        alert("You studied for "+totalSecs+" seconds.");
        //Add code to push totalSecs to database here
    } else {                                    //if the player had been paused, the seconds would have already been added on.
        alert("You studied for "+totalSecs+" seconds.");
        //Add code to push totalSecs to database here
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    document.getElementById("playPause").className="hide";       //Hides play/pause button
    document.getElementById("stop").className="hide";            //Hides stop button
    totalSecs = 0;                                                  //Resets totalSecs variable
}

//===============================================================================================================================
//Function endWorkSession() called when work timer runs down.
//===============================================================================================================================

function endWorkSession(){
    clearInterval(timerVar);
    totalSecs = totalSecs + secsElapsed;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Add code to push totalSecs to database here
    alert("You studied for "+totalSecs+" seconds.");
    totalSecs = 0;
    playBreakTimer();
}

//===============================================================================================================================
//Function playBreakTimer starts the myTimer. It's called when play or resume is pressed.
//===============================================================================================================================

function playBreakTimer(){
    start = new Date().getTime();                                           //Return the number of milliseconds since midnight 1970/01/01
    timerVar = window.setInterval(function(){ myTimer(breakSecsLeft, breakMinsLeft, endBreakSession) }, 100);    //Runs timer
    document.getElementById("clock").className="break";
    document.getElementById("skipBreak").className="show";
    document.getElementById("playPause").className="hide";
    document.getElementById("stop").className="hide";
}

//===============================================================================================================================
//Function endBreakSession runs when break session is finished. It starts work session, and hides "Skip Break" button
//===============================================================================================================================

function endBreakSession(){
    secsElapsed = 0;
    clearInterval(timerVar);
    document.getElementById("skipBreak").className="hide";
    document.getElementById("stop").className="show";
    document.getElementById("playPause").className="show";
    workSecsLeft = 10;
    workMinsLeft = workSecsLeft/60;
    playWorkTimer();

}

//===============================================================================================================================
//Function skipBreak runs 'SkipBreak' button pressed. It starts work session, and hides "Skip Break" button
//===============================================================================================================================

function skipBreak(){
    workSecsLeft = 1500;
    workMinsLeft = workSecsLeft/60;
    secsElapsed = 0;
    document.getElementById("skipBreak").className="hide";
    document.getElementById("stop").className="show";
    document.getElementById("playPause").className="show";
    clearInterval(timerVar);
    playWorkTimer();
}


//the last number that you pause on during a work session, is the number of seconds you get in the next work session.
//The number that it thinks it should resume at, it resumes at next time too.
//If I pause the work at five seconds, then resume again until end, the next work session after the break is only five seconds long.

