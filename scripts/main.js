/**
 * Nael Louis & Sergio Segrera
 */
"use strict";

document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

const APIURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
let start = false;
let btn = document.querySelector("#startstopbtn");
let interval;
let wpm = 60000;
let index = 0;

/**
 * Setup function
 */
function setup() {
     btn.addEventListener('click', startStop);
     let savedWpm = localStorage.getItem("wpm");
     if (savedWpm == null) {
         savedWpm = 100;
     }
    document.querySelector('#wpminput').value = savedWpm;
}

/**
 *  Start button logic 
 * @param {Event} event
 */
function startStop(e) {
    if (!start) {
        getNext()
        btn.childNodes[0].nodeValue = "Stop";
        start = true;
    } else {
        btn.childNodes[0].nodeValue = "Start";
        clearInterval(interval);
        index = 0;
        start = false;
    }
}

/**
 * Gets next quote from API then calls displayQuote()
 */
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

/**
 * Starts interval with appropriate wpm and displayWord() function  
 * @param {string[]} words 
 */
function displayQuote(words) {
    let input = document.querySelector('#wpminput').value;
    window.localStorage.setItem("wpm", input);
    interval = setInterval(displayWord, wpm/input, words);
}

/**
 * Splits word into 3 and updates the DOM and increases the index
 * @param {string[]} words
 */
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

/**
 * Splits word into 3 depending on word length 
 * @param {string} word 
 */
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