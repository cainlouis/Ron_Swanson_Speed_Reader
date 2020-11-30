/**
 * @author Nael Louis & Sergio Segrera
 */
"use strict";

/**
 * This code use the fetch api to get a quote from a website and breaks it into single words. Following that, it gets a value from the html for 
 * the speed with which the words will be displayed. The display will be stopped if the button is pressed after it was started.
 */
document.addEventListener("DOMContentLoaded", function() {
    setup();
}, false);

let global = {};

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @description the globals variables are initialized and event listeners are added to the button and the reader input when they are clicked
 * also call setupWpm to set a default speed if the reader is empty.
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
}

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @description Initiate wpm with saved value in localstorage if it is null, else update the localstorage with the value from the reader
 */
function setupWpm() {
    if (localStorage.getItem("wpm") === null) {
        localStorage.setItem("wpm", 100);
        global.savedWpm = 100;
        global.input.value = global.savedWpm;
    }
    else {
        global.savedWpm = JSON.parse(localStorage.getItem("wpm"));
        global.input.value = global.savedWpm;
    }
}

/**
 * @author Sergio Segrera
 * @author Nael Louis
 *  
 * @param {Event} event
 * 
 * @description Start button logic. If start is not false call the function getNext and change the text of the button to 
 * stop. Else change the text to start, clear the interval, reinitialize the index to 0 and change start to false.
 */
function startStop(e) {
    if (!global.start) {
        getNext()
        global.btn.childNodes[0].nodeValue = "Stop";
        global.start = true;
    } else {
        global.btn.childNodes[0].nodeValue = "Start";
        clearInterval(global.interval);
        global.index = 0;
        global.start = false;
    }
}

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @description Gets next quote from API then calls displayQuote(), split the quote in a array of words.
 * else console log the error.
 */
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

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @param {Event} e
 * 
 * @description Saves wpm to localstorage  
 */
function speedHandler(e) {
    global.savedWpm = global.input.value;
    localStorage.setItem("wpm", global.savedWpm);
}

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @param {string[]} words 
 * 
 * @description Starts interval with appropriate wpm and displayWord() function 
 */
function displayQuote(words) {
    global.interval = setInterval(displayWord, global.wpm/global.savedWpm, words);
}

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @param {string[]} words
 * 
 * @description Splits word into 3 and updates the DOM and increases the index, once we went through the array 
 * clear the interval, reinitialize the index to 0 and call getNext
 */
function displayWord(words) {
    let word = words[global.index];
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

/**
 * @author Sergio Segrera
 * @author Nael Louis
 * 
 * @param {string} word 
 * 
 * @description Splits word into 3 depending on word length 
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