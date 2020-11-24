"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

var APIURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
var start = false;
let btn = document.querySelector("#startstopbtn");
let interval;

function setup() {
     btn.addEventListener('click', startStop);
}

function startStop(e) {
    if (!start) {
        getNext()
        // TODO: Change button text to Stop
        btn.childNodes[0].nodeValue = "Stop";
        start = true;
    } else {
        // TODO: Stop interval, change text to Start
        btn.childNodes[0].nodeValue = "Start";
        clearInterval(interval);
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
    let input = document.querySelector('#wpminput').value;
    words.forEach(element => {
        interval = setInterval(displayWord, input);
    });
}

function displayWord() {

}