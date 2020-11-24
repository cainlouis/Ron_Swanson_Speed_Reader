"use strict";

var APIURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
var start = false;

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

function setup() {
     document.querySelector("#startstopbtn").onclick = startStop;
}

function startStop(e) {
    if (!start) {
        getNext()
        // TODO: Change button text to Stop
        start = true;
    } else {
        // TODO: Stop interval, change text to Start
        start = false;
    }
}

function getNext() {
    fetch(APIURL)
        .then(response => {
            return response.json()
        })
        .then (data => {
            let word = data[0].split(" ");
            displayQuote(word);
        })
        .catch((error) => {
            console.log(error);
        })
}

function displayQuote(words) {

}

function displayWord() {

}