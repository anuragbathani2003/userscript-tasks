// ==UserScript==
// @name         youtube video 2x
// @namespace    http://tampermonkey.net/
// @version      2025-05-12
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @include      https://youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByTagName("video")[0].playbackRate = 2;
})();