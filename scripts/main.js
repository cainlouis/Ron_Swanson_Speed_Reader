//Sergio Arturo Segrera, Nael Louis
"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

let global = {};

/**
 * 
 */
function setup() {
    global.APIURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
    global.start = false;
    global.index = 0;
    global.wpm = 60000;
    global.btn = document.querySelector("#startstopbtn");
    global.input = document.querySelector('#wpminput');

    setupWpm();
    global.btn.addEventListener('click', startStop);
    global.input.addEventListener('click', speedHandler);

    /*global.savedWpm = localStorage.getItem("wpm");
    if (global.savedWpm == null) {
        global.savedWpm = 100;
    }
    global.input.value = global.savedWpm;*/
}

function setupWpm() {
    if (localStorage.getItem("wpm") === null) {
        localStorage.setItem("wpm", JSON.stringify(100));
        global.savedWpm = 100;
        global.input.value = global.savedWpm;
    }
    else {
        global.savedWpm = JSON.parse(localStorage.getItem("wpm"));
        global.input.value = global.savedWpm;
    }
}

function startStop(e) {
    if (!global.start) {
        getNext()
        // TODO: Change button text to Stop
        global.btn.childNodes[0].nodeValue = "Stop";
        global.start = true;
    } else {
        // TODO: Stop interval, change text to Start
        global.btn.childNodes[0].nodeValue = "Start";
        clearInterval(global.interval);
        global.index = 0;
        global.start = false;
    }
}

function getNext() {
    fetch(global.APIURL)
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

function speedHandler(e) {
    global.savedWpm = global.input.value;
    window.localStorage.setItem("wpm", JSON.stringify(global.savedWpm));
}
function displayQuote(words) {
    //let input = document.querySelector('#wpminput').value;
    //window.localStorage.setItem("wpm", input);
    console.log(global.savedWpm);
    global.interval = setInterval(displayWord, global.wpm/global.savedWpm, words);
}

function displayWord(words) {
    let word = words[global.index];
    console.log(word);
    let isSplit = splitWord(word);
    document.querySelector('#left').textContent = isSplit[0];
    document.querySelector('#center').textContent = isSplit[1];
    document.querySelector('#right').textContent = isSplit[2];
    global.index++;
    if(words.length == global.index) {
        clearInterval(global.interval);
        global.index = 0;
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