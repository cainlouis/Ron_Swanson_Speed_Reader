"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

var APIURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
var start = false;
let btn = document.querySelector("#startstopbtn");
let interval;
let wpm = 60000;
let index = 0;

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
        index = 0;
        start = false;
    }
}

function getNext() {
    fetch(APIURL)
        .then(response => {
            return response.json()
        })
        .then (data => {
            let words = data[0].split(" ");
            displayQuote(words);
        })
        .catch((error) => {
            console.log(error);
        })
}

function displayQuote(words) {
    let input = document.querySelector('#wpminput').value;
    interval = setInterval(displayWord, wpm/input, words);
}

function displayWord(words) {
    let word = words[index];
    console.log(word);
    let isSplit = splitWord(word);
    document.querySelector('#left').textContent = isSplit[0];
    document.querySelector('#center').textContent = isSplit[1];
    document.querySelector('#right').textContent = isSplit[2];
    index++;
    if(words.length == index) {
        clearInterval(interval);
        index = 0;
        getNext();
    }
}

function splitWord(word) {
    let size = word.length; 
    if(size < 2) {
        return ['    ', word, ''];
    }
    if(size == 2) {
        return [`   ${word.substring(0, 1)}`, word.substring(1, 2), ''];
    }
    if(size > 2 && size < 6) {
        return [`   ${word.substring(0, 1)}`, word.substring(1, 2), word.substring(2, size)];
    }
    if(size < 10){
        return [`  ${word.substring(0, 2)}`, word.substring(2, 3), word.substring(3, size)];
    }
    if(size < 14) {
        return [` ${word.substring(0, 3)}`, word.substring(3, 4), word.substring(4, size)];
    }
    return [word.substring(0, 4), word.substring(4, 5), word.substring(5, size)];
}