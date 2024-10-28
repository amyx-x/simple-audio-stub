
// Define constants for interactive html elements
const playPauseButton = document.getElementById("play-pause-button")
const currentTimeH4 = document.getElementById("current-time")
const totalTime =document.getElementById("total-time")
const seekBar = document.getElementById("seek-bar")
// audio object that stores audio file, permits playback etc...
const myAudio = new Audio("audio/Soft-Background-for-Interview.webm")
// boolean to track seek state
let isSeeking = false
// core playback functions
console.log(playPauseButton)
playPauseButton.onclick = function(){
// myAudio.paused == true (shorthand v)
    if(myAudio.paused){
        myAudio.play()
    }else{
        myAudio.pause()
    }
}
// when audio plays, change icon to pause
myAudio.onplay= function(){
    playPauseButton.src="images/pause.svg"
}
// when audio pauses, change icon to play
myAudio.onpause= function(){
    playPauseButton.src="images/play.svg"
}
// once we have track info available, set the total time and seek bar
myAudio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(myAudio.duration)
    // round the duration down to the nearest whole number for the slider to work
    seekBar.max = Math.floor(audio.duration)
}
// update current time with audio playback 
myAudio.ontimeupdate = function(){
    currentTimeH4.innerHTML = formatTime(myAudio. currentTime)
    // update seek bar when not seeking
    if(!isSeeking){ // same as isSeeking == false
        // round down current time for the slider
        seekBar.value =Math.floor(myAudio.currentTime)
    }
}
// on seekbar user imput set isSeeking to true
seekBar.oninput =function(){
    isSeeking =true
}
// on seekbar change e.g. dragged by user 
seekBar.onchange =function(){
    // update the audio current time to reflect seek bar poisition 
    myAudio.currentTime =seekBar.value
    // reset seekig state
    isSeeking = false 
}
// when finished, reset 
myAudio.onended = function(){
    currentTimeH4.innerHTML=formatTime(0)
    seekBar.value=0;
}

/**
 * This formatTime function will format time from seconds to a human readable time.
 * This funciton has been given to you and you don't need to understand how it works.
 * @param {number} secs 
 * @returns {string} a string with hours:minutes:seconds OR minutes:seconds if we're at the hour 00. 
 */
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}