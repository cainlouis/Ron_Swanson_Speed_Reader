"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

function setup() {
     document.querySelector("#startbtn").onclick = start;
     document.querySelector("#stopbtn").onclick = stop;
}

function start(e) {
    console.log("Start");
}

function stop(e) {
    console.log("Stop");
}