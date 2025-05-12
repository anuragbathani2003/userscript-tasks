// ==UserScript==
// @name         find all href
// @namespace    http://tampermonkey.net/
// @version      2025-05-12
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   const links = document.querySelectorAll('a[href]');

    if(links.length > 0){

        const newlinks = Array.from(links).map(link => link.href) ;
        alert(newlinks.join("\n"));}
    else{
        console.log(" links not found");
    }
})();