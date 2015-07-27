/**
 * Created by roisinokeeffe on 27/07/2015.
 */




//The set interval method of the window object is a loop. It carries out a function every specified number of
//milliseconds. It takes two parameters, the first is a function, the second is a number of milliseconds.
//1 second = 1000 milliseconds

var timerVar = window.setInterval(function(){ myTimer() }, 100);

var start = new Date().getTime();       //Return the number of milliseconds since midnight 1970/01/01
var elapsed = '0';                      //Declare variable for elapsed time (starts at zero)

var secs = 60;                         //sets seconds to 180 (3 mins)

function myTimer(){
    var time = new Date().getTime() - start;                        //Gets amount of milliseconds that have passed since start
    elapsed = Math.floor(time / 1000);                              //Rounds number to a second
    document.getElementById("time").innerHTML = secs -(elapsed);    //updates paragraph to starting amount of secs, minus seconds elapsed
}//end of function myTimer

function pauseTimer(){
    clearInterval(timerVar);
    secs = document.getElementById("time").innerHTML;
    secs = parseInt(secs);
}

function resumeTimer(){
    start = new Date().getTime();
    timerVar = window.setInterval(function(){ myTimer() }, 100);
};

//=============================================================================================
//http://navaneeth.me/simple-countdown-timer-using-javascript/#.VbZU7WRVikp
//works for short times when browser is open all the time.
//=============================================================================================

//function countdown(minutes) {
//    var seconds = 60;
//    var mins = minutes
//    function tick() {
//        var counter = document.getElementById("timer");
//
//        var current_minutes = mins-1
//        seconds--;
//        counter.innerHTML =
//            current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
//
//        if( seconds > 0 ) {
//            setTimeout(tick, 1000);
//        } //else {
//
//            //if(mins > 1){
//            //
//            //    // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
//            //    setTimeout(function () { countdown(mins - 1); }, 1000);
//            //
//            //}
//        //}
//    }
//    tick();
//}
//
//countdown(15);
