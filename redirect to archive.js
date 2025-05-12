// ==UserScript==
// @name         redirection
// @namespace    http://tampermonkey.net/
// @version      2025-05-12
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    const currenturl= window.location.href;

    const newurl= "https://archive.is/" + currenturl;

    function redirectToURL(){
         window.location.replace(newurl);
    }

       setInterval(redirectToURL,4000);



})();